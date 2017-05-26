var {json2ts, parse, transform, defaults} = require("../");
var ts = require("typescript");
var nq = require('needsquotes');
var content = `
interface IBody {
  // code: string;  // PropertySignature = 148,
  // code?: string; // PropertySignature = 148,
                    //  questionToken: QuestionToken = 55
                    //  type: StringKeyword = 136
                    
  // code: IOther;  // PropertySignature = 148,
                    //   type: TypeReference = 159
                    //     typeName: 'IOther'
                    
  // code: string|number[]; // PropertySignature = 148,
                          // type: UnionType = 166  
                          // types: [
                               StringKeyword = 136,
                               ArrayType = 164
                                 elementType: NumberKeyword = 133 
                       
  code: {name: string};  // PropertySignature = 148,
                         // type: TypeLiteral = 163
                         // members: []
                         
  // code: string[];  // PropertySignature = 148,
                      // type: ArrayType = 164
                      // elementType: {}
                   
  // code: IOther[];  // PropertySignature = 148,
                      // type: ArrayType = 164
                      // elementType: TypeReference = 159
                      //    typeName: text: 'IOther'
}
`;

const json = `
{
    "/get <api>": null
}
`;

const outgoing = transform(parse(json, defaults), defaults).reverse();
// console.log(JSON.stringify(outgoing, null, 2));

var res1 = ts.createSourceFile('module', content, ts.ModuleKind.None);

const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
});

function namedProp(name) {
    const qs = nq(name);

    const output = qs.needsQuotes ? qs.quotedValue : name;

    const prop = ts.createNode(ts.SyntaxKind.PropertySignature);
    prop.name = ts.createIdentifier(output);
    return prop;
}

const main  = ts.createNode(ts.SyntaxKind.InterfaceDeclaration);
main.name   = ts.createIdentifier('IRootObject');
const prop  = namedProp('name');
const child = namedProp('other');
child.type = ts.createNode(ts.SyntaxKind.StringKeyword);

prop.type = ts.createTypeLiteralNode([
    child
]);

main.members = [
    prop
];

const stack = [];

getStatements(outgoing);

function getStatements(stackItems) {
    return stackItems.forEach(node => {
        switch(node.kind) {
            case ts.SyntaxKind.InterfaceDeclaration: {
                const item   = ts.createNode(node.kind);
                item.name    = ts.createIdentifier(node.name);
                item.members = getMembers(node.members);
                stack.push(item);
            }
        }
    });
}

function getMembers(members) {
    return members.map(member => {
        switch(member.kind) {
            case ts.SyntaxKind.ArrayType: {
                const item = namedProp(member.name);
                if (member.types.length === 0) {
                    item.type = ts.createArrayTypeNode(ts.SyntaxKind.AnyKeyword);
                } else {
                    item.type = ts.createArrayTypeNode(member.types[0]);
                }
                return item;
            }
            case ts.SyntaxKind.TypeLiteral: {
                const item = namedProp(member.name);
                item.type = ts.createTypeLiteralNode(getMembers(member.members));
                return item;
            }
            case ts.SyntaxKind.TypeReference: {
                const item = namedProp(member.name);
                if (member.types.length === 1) {
                    item.type = ts.createTypeReferenceNode(member.types[0]);
                } else {
                    // multiple types
                }
                return item;
            }
            case ts.SyntaxKind.StringKeyword:
            case ts.SyntaxKind.NumberKeyword: {
                const item = namedProp(member.name);
                item.type = ts.createNode(member.kind);
                return item;
            }
            case ts.SyntaxKind.BooleanKeyword: {
                const item = namedProp(member.name);
                item.type = ts.createNode(member.kind);
                return item;
            }
            case ts.SyntaxKind.NullKeyword: {
                const item = namedProp(member.name);
                item.type = ts.createNode(member.kind);
                return item;
            }
            default: return member;
        }
    });
}


// console.log(JSON.stringify(res1.statements[1], null, 2));
//
stack.forEach(s => {
    console.log(printer.printNode(ts.EmitHint.Unspecified, s, res1))
})
//
// console.log();
// console.log(printer.printNode(ts.EmitHint.Unspecified, stack[1], res1));

// console.log(stack.join('\n\n'));