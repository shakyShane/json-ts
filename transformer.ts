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

    let interfaceStack = OrderedSet([]);

    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: 'rootObject',
        body: stack
    }];

    const initial = getInterface(wrapper[0]);
    push(initial);

    return interfaceStack.toJS();

    function push(newInterface: InterfaceNode): void {
        interfaceStack = interfaceStack.add(fromJS(newInterface));
    }

    // function walk(node) {
    //     switch(node.kind) {
    //         case ts.SyntaxKind.ObjectLiteralExpression: {
    //             const newInterface = getInterface(node);
    //             push(newInterface);
    //         }
    //     }
    // }

    function getInterface(node: ParsedNode): InterfaceNode {
        const newInterface = {
            name: 'I' + node.name[0].toUpperCase() + node.name.slice(1),
            original: node.name,
            members: getMembers(node.body)
        };
        return newInterface;
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
                    const newInterface = getInterface(node);
                    push(newInterface);

                    return `${newInterface.original}: ${newInterface.name};`
                }

            }
        });
        return members
    }
}



