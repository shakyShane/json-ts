import * as ts from 'typescript';
import {ParsedNode} from "./parser";
import * as Immutable from 'immutable';
import {OrderedSet, List, Set} from "immutable";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";

const {startCase, toLower} = require('../_');
const { Map, is, fromJS} = Immutable;

export const log = (input) => console.log('--\n', JSON.stringify(input, null, 2));

export interface MemberNode {
    types: Set<string>
    members: MemberNode[]
    name: string
    optional: boolean
}

export interface ImmutableMemberNode extends Map<string, any> {
    get(path: 'types'): Set<string>
    get(path: 'members'): List<ImmutableMemberNode>
    get(path: 'name'): string
    get(path: 'optional'): boolean
}

export interface InterfaceNode {
    name: string;
    original: string;
    members: MemberNode[];
}

export interface ImmutableNode extends Map<string, any> {
    get(path: 'name'): string
    get(path: 'original'): string
    get(path: 'members'): List<ImmutableMemberNode>
}

function namedProp(member) {
    const qs = needsQuotes(member.name);

    const output = qs.needsQuotes ? qs.quotedValue : member.name;

    const prop: any = ts.createNode(ts.SyntaxKind.PropertySignature);
    prop.name = ts.createIdentifier(output);

    if (member.optional) {
        prop.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
    }

    return prop;
}

export function transform(stack: ParsedNode[], options: JsonTsOptions): InterfaceNode[] {

    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: options.rootName,
        interfaceCandidate: true,
        body: stack
    }];

    const out = getInterfaces(wrapper);
    // const merged = mergeDuplicateInterfaces(interfaces.toList());

    // return merged.toJS().reverse();
    return out.toJS();

    function createOne(node: ParsedNode): InterfaceNode {

        const thisMembers = getMembers(node.body);
        const item: any   = ts.createNode(ts.SyntaxKind.InterfaceDeclaration);
        item.name         = ts.createIdentifier(newInterfaceName(node));
        item.members      = ts.createNodeArray(thisMembers, false);

        return item;
    }

    function getInterfaces(nodes: ParsedNode[]): OrderedSet<ImmutableNode> {
        return nodes.reduce((acc, node) => {

            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {

                const newInterface = createOne(node);
                const asMap = fromJS(newInterface);

                if (node.interfaceCandidate) {
                    const newAsList = List([asMap]);
                    return acc.concat(newAsList, getInterfaces(node.body));
                }

                return acc.concat(getInterfaces(node.body));
            }

            if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                const clone = fromJS(node.body).toJS();

                const decorated = clone.map(arrayNode => {
                    arrayNode.name = getArrayItemName(node.name);
                    return arrayNode;
                });

                const other = getInterfaces(decorated);

                return acc.concat(other);
            }

            return acc;

        }, OrderedSet([]) as any);
    }

    function getMembers(stack: ParsedNode[]) {
        const members = stack.map(node => {
            switch(node.kind) {
                //     case ts.SyntaxKind.NullKeyword: {
                //         const item = namedProp({name: node.name});
                //         item.type = ts.createNode(ts.SyntaxKind.NullKeyword);
                //         return {
                //             name: node.name,
                //             optional: false,
                //             kind: ts.SyntaxKind.NullKeyword,
                //             _kind: ts.SyntaxKind[ts.SyntaxKind.NullKeyword],
                //             types: Set([fromJS(item)]),
                //             members: []
                //         };
                //     }
                //     case ts.SyntaxKind.FalseKeyword:
                //     case ts.SyntaxKind.TrueKeyword: {
                //         const item = namedProp({name: node.name});
                //         item.type = ts.createNode(ts.SyntaxKind.BooleanKeyword);
                //         return {
                //             name: node.name,
                //             optional: false,
                //             kind: ts.SyntaxKind.BooleanKeyword,
                //             _kind: ts.SyntaxKind[ts.SyntaxKind.BooleanKeyword],
                //             types: Set([fromJS(item)]),
                //             members: []
                //         }
                //     }
                case ts.SyntaxKind.StringLiteral: {
                    const item = namedProp({name: node.name});
                    item.type = ts.createNode(ts.SyntaxKind.StringKeyword);
                    return item;
                }
                case ts.SyntaxKind.NumericLiteral: {
                    const item = namedProp({name: node.name});
                    item.type = ts.createNode(ts.SyntaxKind.NumberKeyword);
                    return item;
                }
                    //     case ts.SyntaxKind.ObjectLiteralExpression: {
                    //
                    //         if (node.interfaceCandidate) {
                    //             const newInterface = createOne(node);
                    //             // const matches = getMatches(newInterface.members);
                    //             //
                    //             // const interfaceName = matches.length
                    //             //     ? matches[0].get('name')
                    //             //     : newInterface.name;
                    //
                    //             return {
                    //                 kind: ts.SyntaxKind.TypeReference,
                    //                 _kind: ts.SyntaxKind[ts.SyntaxKind.TypeReference],
                    //                 name: node.name,
                    //                 optional: false,
                    //                 types: Set([newInterface.name]),
                    //                 members: []
                    //             }
                    //         } else {
                    //             return {
                    //                 kind: ts.SyntaxKind.TypeLiteral,
                    //                 _kind: ts.SyntaxKind[ts.SyntaxKind.TypeLiteral],
                    //                 name: node.name,
                    //                 optional: false,
                    //                 types: Set([]),
                    //                 members: getMembers(node.body)
                    //             }
                    //         }
                    //     }
                    //     case ts.SyntaxKind.ArrayLiteralExpression: {
                    //         if (node.body.length) {
                    //             const memberTypes = getArrayElementsType(node);
                    //             return {
                    //                 kind: ts.SyntaxKind.ArrayType,
                    //                 _kind: ts.SyntaxKind[ts.SyntaxKind.ArrayType],
                    //                 name: node.name,
                    //                 optional: false,
                    //                 types: Set(fromJS([memberTypes])),
                    //                 members: [],
                    //             };
                    //         } else {
                    //             return {
                    //                 kind: ts.SyntaxKind.ArrayType,
                    //                 _kind: ts.SyntaxKind[ts.SyntaxKind.ArrayType],
                    //                 name: node.name,
                    //                 optional: false,
                    //                 types: Set(fromJS([])),
                    //                 members: [],
                    //             };
                    //         }
                    //     }
            }
        });
        return members
    }

    function getArrayElementsType(node: ParsedNode) {
        const kinds = Set(node.body.map(x => x.kind));
        if (kinds.size === 1) { // if there's only 1 kind in the array, it's safe to use type[];
            const kind = kinds.first();
            switch(kind) {
                case ts.SyntaxKind.NullKeyword:
                    return ts.createNode(ts.SyntaxKind.NullKeyword);
                case ts.SyntaxKind.StringLiteral:
                    return ts.createNode(ts.SyntaxKind.StringKeyword);
                case ts.SyntaxKind.TrueKeyword:
                case ts.SyntaxKind.FalseKeyword: {
                    return ts.createNode(ts.SyntaxKind.BooleanKeyword);
                }
                case ts.SyntaxKind.NumericLiteral:
                    return ts.createNode(ts.SyntaxKind.NumberKeyword);
                case ts.SyntaxKind.ObjectLiteralExpression:
                    const item = ts.createTypeReferenceNode(getArrayInterfaceItemName(node.name), undefined);
                    return item;
                default: return ts.createNode(ts.SyntaxKind.AnyKeyword);
            }
        } else if (kinds.size === 2) { // a mix of true/false is still a boolean[];
            if (kinds.has(ts.SyntaxKind.TrueKeyword) && kinds.has(ts.SyntaxKind.FalseKeyword)) {
                return ts.createNode(ts.SyntaxKind.BooleanKeyword);
            }
        }
        return ts.createNode(ts.SyntaxKind.AnyKeyword);
    }
    function newInterfaceName(node: ParsedNode) {
        const base = node.name[0].toUpperCase() + node.name.slice(1);
        if (options.prefix) {
            return options.prefix + base;
        }
        return base;
    }
    function upper(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    function pascalCase(input): string {
        return startCase(toLower(input)).replace(/ /g, '');
    }
    function getArrayInterfaceItemName(input): string {
        if (options.prefix) {
            return pascalCase(`${options.prefix}_${input}_Item`);
        }
        return pascalCase(`${input}_Item`)
    }
    function getArrayItemName(input) {
        return pascalCase(`${input}_Item`)
    }
    // function getArrayInterfaceItemName(input) {
    //     return pascalCase(`I_${input}_Item`)
    // }
}



