import {InterfaceNode, MemberNode} from "./transformer";
import needsQuotes = require('needsquotes');

function displayName(name: string): string {
    const needs = needsQuotes(name);

    if (needs.needsQuotes) {
        return needs.quotedValue;
    }
    return name;
}

function memberName(node: MemberNode): string {
    const propName = displayName(node.name);
    if (node.optional) {
        return propName + '?'
    }
    return propName;
}

function typeDisplay(node: MemberNode): string {
    return node.types.join('|');
}

export function print(interfaceNodes: InterfaceNode[]): string {
    const blocks = interfaceNodes
        .reverse()
        .map(node => {
            return [
                `interface ${node.name} {`,
                node.members.map((str: MemberNode) => `  ${memberName(str)}: ${typeDisplay(str)};`).join('\n'),
                `}`
            ].join('\n')
        });

    return blocks.join('\n\n') + '\n';
}