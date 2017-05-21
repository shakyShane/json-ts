import * as ts from 'typescript';
import {ParsedNode} from "./parser";
import * as Immutable from 'immutable';
import {OrderedSet, List, Set} from "immutable";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";

const {startCase, toLower} = require('../_');
const { Map, is, fromJS} = Immutable;

const log = (input) => console.log('--\n', JSON.stringify(input, null, 2));

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
        name: 'rootObject',
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

        const newInterfaceName = 'I' + node.name[0].toUpperCase() + node.name.slice(1);

        const mem = {
            name: newInterfaceName,
            original: node.name,
            members: thisMembers
        };

        return mem;
    }

    function getInterfaces(nodes: ParsedNode[]): OrderedSet<ImmutableNode> {
        return nodes.reduce((acc, node) => {

            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {

                // gather any interfaces for this node's children
                const children = getInterfaces(node.body);
                const newInterface = createOne(node);
                const matches = getMatches(newInterface.members);
                if (matches.length === 0) {
                    const asMap = fromJS(newInterface);
                    memberStack.push(asMap);
                    const newAsList = List([asMap]);
                    return acc.concat(newAsList, children);
                }
                return acc;
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
                    return {name: node.name, optional: false, types: Set(['null']),  members: []};
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.TrueKeyword: {
                    return {name: node.name, optional: false, types: Set(['boolean']),  members: []}
                }
                case ts.SyntaxKind.StringLiteral: {
                    return {name: node.name, optional: false, types: Set(['string']),  members: []}
                }
                case ts.SyntaxKind.NumericLiteral: {
                    return {name: node.name, optional: false, types: Set(['number']),  members: []}
                }
                case ts.SyntaxKind.ObjectLiteralExpression: {

                    const newInterface = createOne(node);
                    const matches = getMatches(newInterface.members);

                    const interfaceName = matches.length
                        ? matches[0].get('name')
                        : newInterface.name;

                    return {
                        name: node.name,
                        optional: false,
                        types: Set([interfaceName]),
                        members: []
                    }
                }
                case ts.SyntaxKind.ArrayLiteralExpression: {
                    if (node.body.length) {
                        const memberTypes = getArrayElementsType(node);
                        return {
                            name: node.name,
                            optional: false,
                            types: Set([`${memberTypes}[]`]),
                            members: [],
                        };
                    } else {
                        return {
                            name: node.name,
                            optional: false,
                            types: Set([`Array<any>`]),
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
                    return 'null';
                case ts.SyntaxKind.StringLiteral:
                    return 'string';
                case ts.SyntaxKind.NumericLiteral:
                    return 'number';
                case ts.SyntaxKind.ObjectLiteralExpression:
                    return getArrayInterfaceItemName(node.name);
                default: return 'any';
            }
        } else if (kinds.size === 2) { // a mix of true/false is still a boolean[];
            if (kinds.has(ts.SyntaxKind.TrueKeyword) && kinds.has(ts.SyntaxKind.FalseKeyword)) {
                return 'boolean';
            }
        }
        return 'any';
    }
    function upper(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    function pascalCase(input) {
        return startCase(toLower(input)).replace(/ /g, '');
    }
    function getArrayInterfaceItemName(input) {
        return pascalCase(`I_${input}_Item`)
    }
    function getArrayItemName(input) {
        return pascalCase(`${input}_Item`)
    }
    // function getArrayInterfaceItemName(input) {
    //     return pascalCase(`I_${input}_Item`)
    // }
}



