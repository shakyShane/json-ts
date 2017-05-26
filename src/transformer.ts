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

export function transform(stack: ParsedNode[], options: JsonTsOptions): InterfaceNode[] {

    const memberStack = [];
    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: options.rootName,
        interfaceCandidate: true,
        body: stack
    }];

    const interfaces = getInterfaces(wrapper);
    const merged = mergeDuplicateInterfaces(interfaces.toList());

    return merged.toJS().reverse();

    function mergeDuplicateInterfaces(interfaces: List<ImmutableNode>): List<ImmutableNode> {
        const merged = interfaces.reduce((acc, current) => {

            const index = acc.findIndex(prev => prev.get('name') === current.get('name'));

            // We have a matching interface NAME
            if (index > -1) {

                // here, the current interface matches a PREV one
                return acc.updateIn([index, 'members'], function(prevMembers) {

                    // console.log('members in current, not in prev');
                    const memberNames = prevMembers.map(x => x.get('name')).toSet();
                    const currenMemberNames = current.get('members').map(x => x.get('name')).toSet();
                    const newMembersFromCurrent = current
                        .get('members')
                        .filter(member => !memberNames.has(member.get('name')))
                        .map(member => {
                            return member.set('optional', true);
                        });

                    // any items that exist

                    return prevMembers
                        .map(prev => {
                            const matchingFromIncoming = current.get('members').find(x => x.get('name') === prev.get('name'));
                            // Does the current type not match the existing?
                            if (matchingFromIncoming && !matchingFromIncoming.get('types').contains(prev.get('type'))) {
                                return prev.update('types', function (types) {
                                    if (types.contains('Array<any>')) {
                                        return matchingFromIncoming.get('types');
                                    } else if (matchingFromIncoming.get('types').contains('Array<any>')) {
                                        return types.concat(matchingFromIncoming.get('types').filter(x => x !== 'Array<any>'))
                                    }
                                    return types.concat(matchingFromIncoming.get('types'));
                                });
                            }
                            return prev;
                        })
                        // Look at prev member, if it doesn't exist in this current object, it's
                        // optional
                        .map(prev => {
                            if (!currenMemberNames.has(prev.get('name'))) {
                                return prev.set('optional', true);
                            }
                            return prev;
                        })
                        .concat(newMembersFromCurrent);
                })
            }

            return acc.push(current);

        }, List([]));

        return merged;
    }

    function getMatches(members: MemberNode[]) {
        return memberStack.filter(m => {
            return Immutable.is(m.get('members'), fromJS(members))
        });
    }

    function createOne(node: ParsedNode): InterfaceNode {

        const thisMembers = getMembers(node.body);

        const mem = {
            kind: ts.SyntaxKind.InterfaceDeclaration,
            _kind: ts.SyntaxKind[ts.SyntaxKind.InterfaceDeclaration],
            name: newInterfaceName(node),
            original: node.name,
            members: thisMembers
        };

        return mem;
    }

    function getInterfaces(nodes: ParsedNode[]): OrderedSet<ImmutableNode> {
        return nodes.reduce((acc, node) => {

            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {

                // gather any interfaces for this node's children
                // const children = getInterfaces(node.body);

                const newInterface = createOne(node);
                const matches = getMatches(newInterface.members);
                const asMap = fromJS(newInterface);

                if (node.interfaceCandidate) {
                    if (matches.length === 0) {
                        memberStack.push(asMap);
                        const newAsList = List([asMap]);
                        return acc.concat(newAsList, getInterfaces(node.body));
                    } else {
                        const newAsList = List([asMap]);
                        return acc.concat(newAsList, getInterfaces(node.body));
                    }
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

    function getMembers(stack: ParsedNode[]): MemberNode[] {
        const members = stack.map(node => {
            switch(node.kind) {
                case ts.SyntaxKind.NullKeyword:
                    return {
                        name: node.name,
                        optional: false,
                        kind: ts.SyntaxKind.NullKeyword,
                        _kind: ts.SyntaxKind[ts.SyntaxKind.NullKeyword],
                        types: Set(['null']),
                        members: []
                    };
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.TrueKeyword: {
                    return {
                        name: node.name,
                        optional: false,
                        kind: ts.SyntaxKind.BooleanKeyword,
                        _kind: ts.SyntaxKind[ts.SyntaxKind.BooleanKeyword],
                        types: Set(['boolean']),
                        members: []
                    }
                }
                case ts.SyntaxKind.StringLiteral: {
                    return {name: node.name,
                        optional: false,
                        types: Set(['string']),
                        kind: ts.SyntaxKind.StringKeyword,
                        _kind: ts.SyntaxKind[ts.SyntaxKind.StringKeyword],
                        members: []
                    }
                }
                case ts.SyntaxKind.NumericLiteral: {
                    return {
                        name: node.name,
                        optional: false,
                        types: Set(['number']),
                        kind: ts.SyntaxKind.NumberKeyword,
                        _kind: ts.SyntaxKind[ts.SyntaxKind.NumberKeyword],
                        members: []
                    }
                }
                case ts.SyntaxKind.ObjectLiteralExpression: {

                    if (node.interfaceCandidate) {
                        const newInterface = createOne(node);
                        const matches = getMatches(newInterface.members);

                        const interfaceName = matches.length
                            ? matches[0].get('name')
                            : newInterface.name;

                        return {
                            kind: ts.SyntaxKind.TypeReference,
                            _kind: ts.SyntaxKind[ts.SyntaxKind.TypeReference],
                            name: node.name,
                            optional: false,
                            types: Set([interfaceName]),
                            members: []
                        }
                    } else {
                        return {
                            kind: ts.SyntaxKind.TypeLiteral,
                            _kind: ts.SyntaxKind[ts.SyntaxKind.TypeLiteral],
                            name: node.name,
                            optional: false,
                            types: Set(['__ObjectLiteralExpression']),
                            members: getMembers(node.body)
                        }
                    }
                }
                case ts.SyntaxKind.ArrayLiteralExpression: {
                    if (node.body.length) {
                        const memberTypes = getArrayElementsType(node);
                        return {
                            kind: ts.SyntaxKind.ArrayType,
                            _kind: ts.SyntaxKind[ts.SyntaxKind.ArrayType],
                            name: node.name,
                            optional: false,
                            types: Set(fromJS([memberTypes])),
                            members: [],
                        };
                    } else {
                        return {
                            kind: ts.SyntaxKind.ArrayType,
                            _kind: ts.SyntaxKind[ts.SyntaxKind.ArrayType],
                            name: node.name,
                            optional: false,
                            types: Set(fromJS([])),
                            members: [],
                        };
                    }
                }
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
                    const item = ts.createTypeReferenceNode(getArrayInterfaceItemName(node.name));
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
    function pascalCase(input) {
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



