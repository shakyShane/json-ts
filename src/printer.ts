import * as ts from 'typescript';
import {InterfaceNode, log, MemberNode} from "./transformer";
import needsQuotes = require('needsquotes');
import {JsonTsOptions} from "./index";

export function print(interfaceNodes: InterfaceNode[], options: JsonTsOptions): string {

    var res1 = ts.createSourceFile('module', '', ts.ModuleKind.None);

    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
    });

    return interfaceNodes.map(x => {
        return printer.printNode(ts.EmitHint.Unspecified, x, res1);
    }).join('\n\n') + '\n';
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
