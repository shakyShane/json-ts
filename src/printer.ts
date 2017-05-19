import {InterfaceNode, MemberNode} from "./transformer";

export function print(interfaceNodes: InterfaceNode[]): string {

    const blocks = interfaceNodes
        .reverse()
        .map(node => {
            return [
                `interface ${node.name} {`,
                node.members.map((str: MemberNode) => `  ${str.display}`).join('\n'),
                `}`
            ].join('\n')
        });

    return blocks.join('\n\n') + '\n';
}