import * as ts from 'typescript';

export interface ParsedNode {
    kind: ts.SyntaxKind
    _kind: string
    name?: string
    value?: any
    body?: ParsedNode[]
}

function walk(sourceFile: ts.SourceFile): ParsedNode[] {

    const stack : Array<ParsedNode> = [];
    const elementStack : Array<ParsedNode> = [];

    function push(element) {
        const parent = elementStack[elementStack.length - 1];
        const siblings = (parent && parent.body) ? parent.body : stack;
        siblings.push(element);
    }

    eachProp(sourceFile);

    return stack;

    function addFromElement(incoming) {
        switch(incoming.kind) {
            case ts.SyntaxKind.NumericLiteral: {
                const elem = {
                    kind: ts.SyntaxKind.NumericLiteral,
                    _kind: `NumericLiteral`,
                    name: incoming.text,
                    value: incoming.text,
                };
                push(elem);
                break;
            }
            case ts.SyntaxKind.StringLiteral: {
                const elem = {
                    kind: ts.SyntaxKind.StringLiteral,
                    _kind: `StringLiteral`,
                    name: incoming.text,
                    value: incoming.text,
                };
                push(elem);
                // console.log(incoming);
                break;
            }
            case ts.SyntaxKind.ObjectLiteralExpression: {
                const elem = {
                    kind: ts.SyntaxKind.ObjectLiteralExpression,
                    _kind: `ObjectLiteralExpression`,
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
                // console.log(prop);
                return addFromElement(prop);
            } else {
                switch (prop.initializer.kind) {
                    case ts.SyntaxKind.StringLiteral: {
                        const elem = {
                            name: prop.name.text,
                            value: prop.initializer.text,
                            kind: ts.SyntaxKind.StringLiteral,
                            _kind: `StringLiteral`
                        };
                        push(elem);
                        break;
                    }
                    case ts.SyntaxKind.NumericLiteral: {
                        const elem = {
                            name: prop.name.text,
                            value: prop.initializer.text,
                            kind: ts.SyntaxKind.NumericLiteral,
                            _kind: `NumericLiteral`,
                        };
                        push(elem);
                        break;
                    }
                    case ts.SyntaxKind.ObjectLiteralExpression: {
                        // console.log('OBJ', prop.name.text);
                        const elem = {
                            name: prop.name.text, body: [],
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
}

export function parse(string): any[] {
    const input = `const ROOTOBJ = ${string}`;
    let sourceFile : ts.SourceFile = ts.createSourceFile('json.ts', input, ts.ScriptTarget.ES2015, /*setParentNodes */ true);
    // delint it
    const _json = sourceFile.statements[0] as any;
    // console.log(sourceFile.statements[0].declarationList.declarations[0].initializer.properties);
    // elementStack.push({name: 'root', body: []});
    const stack = walk(_json.declarationList.declarations[0].initializer.properties);
    return stack;
}