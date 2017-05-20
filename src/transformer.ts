import * as ts from 'typescript';
import {ParsedNode} from "./parser";
import * as Immutable from 'immutable';
import {OrderedSet} from "immutable";

const {startCase, toLower} = require('../_');
const { Map, is, List, fromJS, Set} = Immutable;

const log = (input) => console.log('--\n', JSON.stringify(input, null, 2));

export interface MemberNode {
    type: string
    display: string
    members: MemberNode[]
}

export interface InterfaceNode {
    name: string;
    original: string;
    members: MemberNode[];
}

export function transform(stack: ParsedNode[]): InterfaceNode[] {

    const memberStack = [];
    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: 'rootObject',
        body: stack
    }];

    const initial = getInterfaces(wrapper);

    return initial.toJS().reverse();

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

    function getInterfaces(nodes: ParsedNode[]): OrderedSet<InterfaceNode> {
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

    function getMembers(stack): MemberNode[] {
        const members = stack.map(node => {
            switch(node.kind) {
                case ts.SyntaxKind.NullKeyword:
                    return {type: 'literal', display: `${node.name}: null;`, members: []};
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.TrueKeyword: {
                    return {type: 'literal', display: `${node.name}: boolean;`, members: []}
                }
                case ts.SyntaxKind.StringLiteral: {
                    return {type: 'literal', display: `${node.name}: string;`, members: []}
                }
                case ts.SyntaxKind.NumericLiteral: {
                    return {type: 'literal', display: `${node.name}: number;`, members: []}
                }
                case ts.SyntaxKind.ObjectLiteralExpression: {

                    const newInterface = createOne(node);
                    const matches = getMatches(newInterface.members);

                    const name = matches.length
                        ? matches[0].get('name')
                        : newInterface.name;

                    return {
                        type: 'interface',
                        display: `${newInterface.original}: ${name};`,
                        members: []
                    }
                }
                case ts.SyntaxKind.ArrayLiteralExpression: {
                    const memberTypes = getArrayElementsType(node);
                    return {
                        type: 'array',
                        display: `${node.name}: ${memberTypes}[];`,
                        members: [],
                    };
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



