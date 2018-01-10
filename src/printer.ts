import * as ts from 'typescript';
import {InterfaceNode, kindMap, log, MemberNode, namedProp} from "./transformer";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";

export function print(interfaceNodes, inputKind: ts.SyntaxKind, options: JsonTsOptions): string {

    const result = (ts.createSourceFile as any)('module', '');

    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
    });

    if (inputKind === ts.SyntaxKind.ArrayLiteralExpression) {
        const first = interfaceNodes[0];
        const newNode : any = ts.createNode(ts.SyntaxKind.TypeAliasDeclaration);
        newNode.type = first.members[0].type;
        newNode.name = ts.createIdentifier(`${options.prefix}${options.rootName}`);
        interfaceNodes[0] = newNode;
    }

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
    })
        .join('\n') + '\n';
}

export function printLiteral(node, kind, options) {
    const result = (ts.createSourceFile as any)('module', '');

    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
    });

    const newNode : any = ts.createNode(ts.SyntaxKind.TypeAliasDeclaration);
    newNode.type = ts.createNode(kindMap[kind]);
    newNode.name = ts.createIdentifier(`${options.prefix}${options.rootName}`);

    return printer.printNode(ts.EmitHint.Unspecified, newNode, result);
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
