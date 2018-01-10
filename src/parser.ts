import * as ts from 'typescript';
import {JsonTsOptions} from "./index";
import needsQuotes = require("needsquotes");

export interface ParsedNode {
    kind: ts.SyntaxKind
    _kind: string
    name?: string
    value?: any
    body?: ParsedNode[]
    interfaceCandidate?: boolean
}

function walk(sourceFile: ts.SourceFile, initial = []): ParsedNode[] {

    const stack : Array<ParsedNode> = initial.slice();
    const elementStack : Array<ParsedNode> = initial.slice();

    function push(element) {
        const parent = elementStack[elementStack.length - 1];
        const siblings = (parent && parent.body) ? parent.body : stack;
        siblings.push(element);
    }

    eachProp(sourceFile);

    return stack;

    function addFromArrayElement(incoming) {
        switch(incoming.kind) {
            case ts.SyntaxKind.NullKeyword:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.StringLiteral: {
                push(literalTypeFromArrayElement(incoming, incoming.kind));
                break;
            }
            case ts.SyntaxKind.PrefixUnaryExpression: {
                push(literalTypeFromArrayElement(incoming, ts.SyntaxKind.NumericLiteral));
                break;
            }
            case ts.SyntaxKind.ObjectLiteralExpression: {
                const elem = {
                    kind: ts.SyntaxKind.ObjectLiteralExpression,
                    _kind: `ObjectLiteralExpression`,
                    interfaceCandidate: true,
                    body: [],
                };
                push(elem);
                elementStack.push(elem);
                eachProp(incoming.properties);
                elementStack.pop();
                break;
            }
            case ts.SyntaxKind.ArrayLiteralExpression: {
                const elem = {
                    kind: ts.SyntaxKind.ArrayLiteralExpression,
                    _kind: `ArrayLiteralExpression`,
                    body: [],
                };
                push(elem);
                elementStack.push(elem);
                eachProp(incoming.elements);
                elementStack.pop();
                break;
            }
        }
    }

    function eachProp(properties) {
        properties.forEach(function (prop) {
            if (!prop.initializer) {
                return addFromArrayElement(prop);
            } else {
                switch (prop.initializer.kind) {
                    case ts.SyntaxKind.TrueKeyword:
                    case ts.SyntaxKind.FalseKeyword:
                    case ts.SyntaxKind.NullKeyword:
                    case ts.SyntaxKind.StringLiteral:
                    case ts.SyntaxKind.NumericLiteral: {
                        push(literalTypeFromProp(prop, prop.initializer.kind));
                        break;
                    }
                    case ts.SyntaxKind.PrefixUnaryExpression: {
                        push(literalTypeFromProp(prop, ts.SyntaxKind.NumericLiteral));
                        break;
                    }
                    case ts.SyntaxKind.ObjectLiteralExpression: {
                        const quotes = needsQuotes(prop.name.text).needsQuotes;
                        const interfaceCandidate = (quotes === false);

                        const elem = {
                            name: prop.name.text,
                            body: [],
                            interfaceCandidate,
                            kind: ts.SyntaxKind.ObjectLiteralExpression,
                            _kind: `ObjectLiteralExpression`
                        };
                        push(elem);
                        elementStack.push(elem);
                        eachProp(prop.initializer.properties);
                        elementStack.pop();
                        break;
                    }
                    case ts.SyntaxKind.ArrayLiteralExpression: {
                        const elem = {
                            name: prop.name.text,
                            body: [],
                            kind: ts.SyntaxKind.ArrayLiteralExpression,
                            _kind: `ArrayLiteralExpression`
                        };
                        push(elem);
                        elementStack.push(elem);
                        eachProp(prop.initializer.elements);
                        elementStack.pop();
                        break;
                    }
                }
            }
        });
    }

    function literalTypeFromProp(prop, kind) {
        return {
            name: prop.name.text,
            value: prop.initializer.text,
            kind: kind,
        }
    }

    function literalTypeFromArrayElement(element, kind) {
        return {
            kind,
            name: element.text,
            value: element.text,
        }
    }
}

export function parse(string, options: JsonTsOptions): {stack: any[], inputKind: ts.SyntaxKind} {
    const input = `const ROOTOBJ = ${string}`;
    let stack;
    let sourceFile : ts.SourceFile = ts.createSourceFile('json.ts', input, ts.ScriptTarget.ES2015, /*setParentNodes */ true);
    // delint it
    const _json = sourceFile.statements[0] as any;
    const init = _json.declarationList.declarations[0].initializer;

    switch (init.kind) {
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral: {
            stack = [{
                kind: init.kind,
            }];
            break;
        }
        case ts.SyntaxKind.ArrayLiteralExpression: {
            stack = walk(init.elements, [{
                kind: ts.SyntaxKind.ArrayLiteralExpression,
                _kind: `ArrayLiteralExpression`,
                name: options.rootName,
                body: [],
            }]);
            break;
        }
        default: stack = walk(init.properties);
    }

    return {stack, inputKind: init.kind};
}
