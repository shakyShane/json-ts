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

export function print(interfaceNodes: InterfaceNode[], options: JsonTsOptions): string {
    const lineEnd = options.flow ? ',' : ';';
    const blocks = interfaceNodes
        .reverse()
        .map(node => {
            return [
                interfaceLine(node),
                node.members.map(memberLine).join('\n'),
                `}`
            ].join('\n')
        }).join('\n\n');

    return wrapper(blocks, options) + '\n';

    function interfaceLine (node: InterfaceNode): string {
        if (options.flow) {
            return `export type ${nameDisplay(node)} = {`
        }
        if (options.namespace) {
            return `export interface ${nameDisplay(node)} {`
        }
        return `interface ${nameDisplay(node)} {`;
    }

    function memberLine(node: MemberNode): string {
        return `  ${memberName(node)}: ${typeDisplay(node)}${lineEnd}`
    }

    function nameDisplay(node: InterfaceNode) {
        return node.name;
    }
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
