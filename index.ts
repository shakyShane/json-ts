const {readFileSync} = require("fs");
import * as ts from 'typescript';
// const in = require("typescript");
const obj = {};

function delint(sourceFile) {

    const stack = [];
    const elementStack = [];

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
                // console.log(incoming);
                // console.log('OBJ', prop.name.text);
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

const json = `
const ROOTOBJ = {
  "name": "other",
  "summary": {
    "url": "http://example.com", 
    "path": "/where",
    "loc": {"lat": 10, "lng": 11}
  },
  "lines": [1, 2, "stringy", {name:"shane", age: 29, pets: ["kittie"]}]
}
`;
const expected = `
interface IRootObject {
  name: string;
  summary: ISummary;
  lines: any[]
}
interface ISummary {
  url: string;
  path: string;
  loc: ILoc;
}
interface ILoc {
  lat: number;
  lng: number;
}
`;

let sourceFile : ts.SourceFile = ts.createSourceFile('json.ts', json, ts.ScriptTarget.ES2015, /*setParentNodes */ true);

// delint it
const _json = sourceFile.statements[0].declarationList.declarations[0].initializer;
// console.log(sourceFile.statements[0].declarationList.declarations[0].initializer.properties);
// elementStack.push({name: 'root', body: []});
const stack = delint(_json.properties);

// function replace(item) {
//     if (item.kind === ts.SyntaxKind.StringLiteral) {
//         return 's';
//     }
// }
//
// const replaced = stack.reduce((acc, item) => {
//     return acc.concat(replace(item));
// }, []);

function walk (root) {
    return root.reduce((acc, node) => {
        switch(node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.ArrayLiteralExpression:
                return acc.concat(getLiteralType(node));
            default: return acc;
        }
    }, []);
}

const output = walk(stack);

function getLiteralType(node) {
    switch(node.kind) {
        case ts.SyntaxKind.NumericLiteral:
            return {name: node.name, type: 'number'};
        case ts.SyntaxKind.StringLiteral:
            return {name: node.name, type: 'string'};
        case ts.SyntaxKind.ArrayLiteralExpression:
            return {name: node.name, type: 'any[]'};
    }
}

// console.log(output);
// console.log(JSON.stringify(stack, null, 2));
function gatherInterfaces(root) {
    return root.reduce((acc, item) => {
        if (item.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            const childtypes = new Set(item.body.map(x => x.kind));
            if (childtypes.has(ts.SyntaxKind.ObjectLiteralExpression)) {
                return acc.concat(gatherInterfaces(item.body));
            } else {
                return acc.concat({
                    original: item.name,
                    name: 'I' + item.name[0].toLocaleUpperCase() + item.name.slice(1),
                    type: 'interface',
                    members: item.body.map(getLiteralType)
                });
            }
        }
        return acc;
    }, []);
}

const possibleObjects = gatherInterfaces(stack);

console.log(possibleObjects);