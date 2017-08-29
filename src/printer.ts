import * as ts from 'typescript';
import {InterfaceNode, log, MemberNode} from "./transformer";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";

export function print(interfaceNodes, options: JsonTsOptions): string {

    const result = (ts.createSourceFile as any)('module', '');

    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
    });

    if (options.flow) {
        const modified = interfaceNodes.map(x => {
            const newNode : any = ts.createNode(ts.SyntaxKind.TypeAliasDeclaration);
            newNode.modifiers = [ts.createToken(ts.SyntaxKind.ExportKeyword)];
            newNode.type = ts.createTypeLiteralNode(x.members);
            newNode.name = x.name;
            return newNode;
        });

        const items = modified.map(x => {
            return printer.printNode(ts.EmitHint.Unspecified, x, result);
        }).join('\n') + '\n';

        return ['// @flow', items].join('\n');
    }

    if (options.namespace) {
        interfaceNodes.forEach(x => {
            x.modifiers = [ts.createToken(ts.SyntaxKind.ExportKeyword)];
        });
        const ns = ts.createModuleDeclaration(
            undefined,
            [ts.createToken(ts.SyntaxKind.DeclareKeyword)],
            ts.createIdentifier(options.namespace),
            ts.createModuleBlock(interfaceNodes),
            ts.NodeFlags.Namespace
        );
        return printer.printNode(ts.EmitHint.Unspecified, ns, result) + '\n';
    }

    return interfaceNodes.map(x => {
        return printer.printNode(ts.EmitHint.Unspecified, x, result);
    }).join('\n') + '\n';
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
