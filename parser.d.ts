import * as ts from 'typescript';
export interface ParsedNode {
    kind: ts.SyntaxKind;
    _kind: string;
    name?: string;
    value?: any;
    body?: ParsedNode[];
}
export declare function parse(string: any): any[];
