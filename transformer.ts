import * as ts from 'typescript';
import {ParsedNode} from "./parser";
import * as Immutable from 'immutable';

const { Map, is, List, fromJS, OrderedSet} = Immutable;

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

    function getInterfaces(nodes: ParsedNode[]): InterfaceNode[] {
        return nodes.reduce((acc, node) => {
            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                const other = getInterfaces(node.body);
                return acc.concat(fromJS([createOne(node)]), other);
            }
            return acc;
        }, OrderedSet([]));
    }

    function getMembers(stack): string[] {
        const members = stack.map(node => {
            switch(node.kind) {
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

            }
        });
        return members
    }
}



