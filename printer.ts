import {InterfaceNode} from "./transformer";

export function print(interfaceNodes: InterfaceNode[]): string {

    const blocks = interfaceNodes
        .reverse()
        .map(node => {
            return [
                `interface ${node.name} {`,
                node.members.map(str => `  ${str}`).join('\n'),
                `}`
            ].join('\n')
        });

    return blocks.join('\n\n') + '\n';
}