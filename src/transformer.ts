import * as ts from 'typescript';
import {ParsedNode} from "./parser";
import {Set as ImmutableSet} from "immutable";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";
import {collapseInterfaces} from "./collapse-interfaces";
import {Node} from "typescript";

const {startCase, toLower} = require('../_');

export const log = (input) => console.log('--\n', JSON.stringify(input, null, 2));

export interface MemberNode {
    types: ImmutableSet<string>
    members: MemberNode[]
    name: string
    optional: boolean
}

export interface InterfaceNode {
    name: string;
    original: string;
    members: MemberNode[];
}

export const kindMap = {
    [ts.SyntaxKind.NullKeyword]: ts.SyntaxKind.NullKeyword,
    [ts.SyntaxKind.StringLiteral]: ts.SyntaxKind.StringKeyword,
    [ts.SyntaxKind.FirstLiteralToken]: ts.SyntaxKind.NumberKeyword,
    [ts.SyntaxKind.TrueKeyword]: ts.SyntaxKind.BooleanKeyword,
    [ts.SyntaxKind.FalseKeyword]: ts.SyntaxKind.BooleanKeyword,
    [ts.SyntaxKind.NumericLiteral]: ts.SyntaxKind.NumberKeyword,
};

export function namedProp(member) {
    const qs = needsQuotes(member.name);

    const output = qs.needsQuotes ? qs.quotedValue : member.name;

    const prop: any = ts.createNode(ts.SyntaxKind.PropertySignature);
    prop.name = ts.createIdentifier(output);

    if (member.optional) {
        prop.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
    }

    return prop;
}

const safeUnions = ImmutableSet([
    ts.SyntaxKind.TrueKeyword,
    ts.SyntaxKind.FalseKeyword,
    ts.SyntaxKind.StringLiteral,
    ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.PrefixUnaryExpression,
    ts.SyntaxKind.NullKeyword,
]);

export function transform(stack: ParsedNode[], options: JsonTsOptions): InterfaceNode[] {

    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: options.rootName,
        interfaceCandidate: true,
        body: stack
    }];

    const interfaces = getInterfaces(wrapper);

    return collapseInterfaces(interfaces);

    function createOne(node: ParsedNode): InterfaceNode {

        const thisMembers = getMembers(node.body);
        const item: any   = ts.createNode(ts.SyntaxKind.InterfaceDeclaration);
        item.name         = ts.createIdentifier(newInterfaceName(node));
        item.members      = ts.createNodeArray(thisMembers, false);

        return item;
    }

    function getInterfaces(nodes: ParsedNode[]): any[] {
        return nodes.reduce((acc, node) => {

            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {

                const newInterface = createOne(node);
                // const asMap = fromJS(newInterface);

                if (node.interfaceCandidate) {
                    return acc.concat([newInterface], getInterfaces(node.body));
                }

                return acc.concat(getInterfaces(node.body));
            }

            if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {

                const decorated = node.body.map(arrayNode => {
                    arrayNode.name = getArrayItemName(node.name);
                    return arrayNode;
                });

                const other = getInterfaces(decorated);

                return acc.concat(other);
            }

            return acc;

        }, []);
    }

    function getMembers(stack: ParsedNode[]) {
        const members = stack.map(node => {
            switch(node.kind) {
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.TrueKeyword: {
                    const item = namedProp({name: node.name});
                    item.type = ts.createNode(ts.SyntaxKind.BooleanKeyword);
                    return item;
                }
                case ts.SyntaxKind.StringLiteral: {
                    const item = namedProp({name: node.name});
                    item.type = ts.createNode(ts.SyntaxKind.StringKeyword);
                    return item;
                }
                case ts.SyntaxKind.NullKeyword: {
                    const item = namedProp({name: node.name});
                    item.type = ts.createNode(ts.SyntaxKind.NullKeyword);
                    return item;
                }
                case ts.SyntaxKind.NumericLiteral: {
                    const item = namedProp({name: node.name});
                    item.type = ts.createNode(ts.SyntaxKind.NumberKeyword);
                    return item;
                }
                case ts.SyntaxKind.ObjectLiteralExpression: {
                    if (node.interfaceCandidate) {
                        const item = namedProp({name: node.name});
                        item.type = ts.createTypeReferenceNode(newInterfaceName(node), undefined);
                        return item;
                    } else {
                        const item = namedProp({name: node.name});
                        item.type = ts.createTypeLiteralNode(getMembers(node.body));
                        return item;
                    }
                }
                case ts.SyntaxKind.ArrayLiteralExpression: {
                    if (node.body.length) {
                        const item = namedProp({name: node.name});
                        const elements = getArrayElementsType(node);
                        item.type = ts.createArrayTypeNode(elements);
                        return item;
                    } else {
                        const item = namedProp({name: node.name});
                        const anyNode: any = ts.createNode(ts.SyntaxKind.AnyKeyword);
                        item.type = ts.createArrayTypeNode(anyNode);
                        return item;
                    }
                }
            }
        });
        return members
    }

    function getArrayElementsType(node: ParsedNode): any {
        const kinds = ImmutableSet(node.body.map(x => x.kind));
        if (kinds.size === 1) { // if there's only 1 kind in the array, it's safe to use type[];
            const kind = kinds.first();
            switch(kind) {
                case ts.SyntaxKind.NullKeyword:
                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.TrueKeyword:
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.NumericLiteral:
                    return ts.createNode(kindMap[kind]);
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
        // console.log(node.body);
        if (kinds.every(kind => safeUnions.has(kind))) {

            // console.log(node.body);
            const types = kinds.map(x => {
                return ts.createNode(kindMap[x]);
            }).toJS();

            const item = ts.createNode(ts.SyntaxKind.ParenthesizedType);
            (item as any).type = ts.createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, types);

            return item;
        } else {
            // console.log('Not creating union as this array contains mixed complexr types');
        }

        return ts.createNode(ts.SyntaxKind.AnyKeyword);
    }
    function newInterfaceName(node: ParsedNode) {
        const base = node.name[0].toUpperCase() + node.name.slice(1);
        if (options.prefix) {
            return options.prefix + base;
        }
        const qs = needsQuotes(base);
        if (qs.needsQuotes) {
            return `_` + base;
        }
        return base;
    }
    function upper(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    function pascalCase(input): string {
        return startCase(input).replace(/ /g, '');
    }
    function getArrayInterfaceItemName(input): string {
        if (options.prefix) {
            return pascalCase(`${options.prefix}_${input}_Item`);
        }
        const qs = needsQuotes(input);
        if (qs.needsQuotes) {
            return '_' + pascalCase(`${input}_Item`);
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



