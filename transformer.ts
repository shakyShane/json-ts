import * as ts from 'typescript';
import {ParsedNode} from "./parser";

export interface InterfaceNode {
    name: string;
    original: string;
    members: string[];
}

export function transform(stack: ParsedNode[]): InterfaceNode[] {

    const interfaceStack = [];

    const wrapper = [{
        kind: ts.SyntaxKind.ObjectLiteralExpression,
        _kind: 'ObjectLiteralExpression',
        name: 'rootObject',
        body: stack
    }];

    wrapper.forEach(walk);

    return interfaceStack;

    function walk(node) {
        switch(node.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression: {
                const newInterface = getInterface(node);
                interfaceStack.unshift(newInterface);
            }
        }
    }

    function getInterface(node) {
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
                    interfaceStack.unshift(newInterface);

                    return `${newInterface.original}: ${newInterface.name};`
                }

            }
        });
        return members
    }
}


