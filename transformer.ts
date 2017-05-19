import * as ts from 'typescript';
import {ParsedNode} from "./parser";
import * as Immutable from 'immutable';
import {startCase, toLower} from 'lodash';
import {OrderedSet} from "immutable";

const { Map, is, List, fromJS, Set} = Immutable;

const log = (input) => console.log('--\n', JSON.stringify(input, null, 2));

export interface InterfaceNode {
    name: string;
    original: string;
    members: string[];
}

export function transform(stack: ParsedNode[]): InterfaceNode[] {

    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: 'rootObject',
        body: stack
    }];

    const initial = getInterfaces(wrapper);

    return initial.toJS().reverse();

    function createOne(node: ParsedNode): InterfaceNode {
        const thisMembers = getMembers(node.body);
        return {
            name: 'I' + node.name[0].toUpperCase() + node.name.slice(1),
            original: node.name,
            members: thisMembers
        };
    }

    function getInterfaces(nodes: ParsedNode[]): OrderedSet<InterfaceNode> {
        return nodes.reduce((acc, node) => {
            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                const other = getInterfaces(node.body);
                return acc.concat(fromJS([createOne(node)]), other);
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

    function getMembers(stack): string[] {
        const members = stack.map(node => {
            switch(node.kind) {
                case ts.SyntaxKind.NullKeyword:
                    return `${node.name}: null;`;
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.TrueKeyword: {
                    return `${node.name}: boolean;`
                }
                case ts.SyntaxKind.StringLiteral: {
                    return `${node.name}: string;`
                }
                case ts.SyntaxKind.NumericLiteral: {
                    return `${node.name}: number;`
                }
                case ts.SyntaxKind.ObjectLiteralExpression: {
                    const newInterface = createOne(node);
                    return `${newInterface.original}: ${newInterface.name};`
                }
                case ts.SyntaxKind.ArrayLiteralExpression: {
                    const memberTypes = getArrayElementsType(node);
                    return `${node.name}: ${memberTypes}[];`;
                }
            }
        });
        return members
    }

    function getArrayElementsType(node: ParsedNode) {
        const kinds = Set(node.body.map(x => x.kind));
        if (kinds.size === 1) {
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
        } else if (kinds.size === 2) {
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



