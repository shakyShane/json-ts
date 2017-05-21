import {InterfaceNode, MemberNode} from "./transformer";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";

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

function interfaceDisplay (node: InterfaceNode, options: JsonTsOptions): string {
    if (options.namespace) {
        return `export interface ${node.name} {`
    }
    return `interface ${node.name} {`;
}

export function print(interfaceNodes: InterfaceNode[], options: JsonTsOptions): string {
    const blocks = interfaceNodes
        .reverse()
        .map(node => {
            return [
                interfaceDisplay(node, options),
                node.members.map((str: MemberNode) => `  ${memberName(str)}: ${typeDisplay(str)};`).join('\n'),
                `}`
            ].join('\n')
        }).join('\n\n');

    return wrapper(blocks, options) + '\n';
}

function wrapper(blocks, options) {
    if (options.namespace) {
        const lines = [
            `declare namespace ${options.namespace} {`,
            ...blocks.split('\n').map(x => `  ${x}`),
            `}`,
        ];
        return lines.join('\n');
    }
    return blocks;
}