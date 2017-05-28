require('source-map-support').install();
var {json2ts, parse, transform, defaults} = require("../");
var ts = require("typescript");
var nq = require('needsquotes');
var catjson = require('fs').readFileSync('../__tests__/magento/categories.json', 'utf8');
var product = require('fs').readFileSync('../__tests__/magento/product.json', 'utf8');
var petition = require('fs').readFileSync('../__tests__/petition/input.json', 'utf8');
var chrome = require('fs').readFileSync('../__tests__/chrome/chrome.json', 'utf8');

const arrayElements = `
{
    single: [-1],
    dupes: [1, 2, 3],
    mixed: [1, "2", false],
    empty: [],
}
`;

const invalidProps = `
{
    "GET /posts": {
        code: 400,
        headers: [{"contentType": "json", "myName":"kittie"}]
    },
    "POST /posts": {
        code: "600",
        headers: [{"contentType": "json"}]
    }
}
`;

const outgoing = transform(parse(chrome, defaults), defaults);
// console.log(JSON.stringify(outgoing, null, 2));

var res1 = ts.createSourceFile('module', chrome, ts.ModuleKind.None);

const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
});

outgoing.forEach(x => {
    console.log(printer.printNode(ts.EmitHint.Unspecified, x, res1) + '\n');
})
// console.log(res1.statements[0].members[0].type);

// function getMembers(members) {
//     return members.map(member => {
//         switch(member.kind) {
//             case ts.SyntaxKind.UnionType: {
//                 const prop = namedProp(member);
//
//                 const memberNodes = member.types.map(x => {
//                     return x.type;
//                 });
//
//                 prop.type = ts.createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, memberNodes);
//
//                 return prop;
//             }
//             case ts.SyntaxKind.ArrayType: {
//                 const item = namedProp(member);
//                 if (member.types.length === 0) {
//                     item.type = ts.createArrayTypeNode(ts.SyntaxKind.AnyKeyword);
//                 } else {
//                     item.type = ts.createArrayTypeNode(member.types[0]);
//                 }
//                 return item;
//             }
//             case ts.SyntaxKind.TypeLiteral: {
//                 const item = namedProp(member);
//                 item.type = ts.createTypeLiteralNode(getMembers(member.members));
//                 return item;
//             }
//             case ts.SyntaxKind.TypeReference: {
//                 const item = namedProp(member);
//                 if (member.types.length === 1) {
//                     item.type = ts.createTypeReferenceNode(member.types[0]);
//                 } else {
//                     // multiple types
//                 }
//                 return item;
//             }
//             case ts.SyntaxKind.StringKeyword:
//             case ts.SyntaxKind.NumberKeyword: {
//                 const item = namedProp(member);
//                 item.type = ts.createNode(member.kind);
//                 return item;
//             }
//             case ts.SyntaxKind.BooleanKeyword: {
//                 const item = namedProp(member);
//                 item.type = ts.createNode(member.kind);
//                 return item;
//             }
//             case ts.SyntaxKind.NullKeyword: {
//                 const item = namedProp(member);
//                 item.type = ts.createNode(member.kind);
//                 return item;
//             }
//             default: return member;
//         }
//     });
// }
//
//
// // console.log(JSON.stringify(res1.statements[1], null, 2));
// // console.log(stack);
// stack.forEach(s => {
//     console.log(printer.printNode(ts.EmitHint.Unspecified, s, res1))
// })
//
// console.log();
// console.log(printer.printNode(ts.EmitHint.Unspecified, stack[1], res1));

// console.log(stack.join('\n\n'));