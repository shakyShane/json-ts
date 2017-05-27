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
  "results" : [
    {
      "address_components" : [
        {
          "long_name" : "London",
          "short_name" : "London",
          "types" : [ "locality", "political" ]
        },
        {
          "long_name" : "London",
          "short_name" : "London",
          "types" : [ "postal_town" ]
        },
        {
          "long_name" : "Greater London",
          "short_name" : "Greater London",
          "types" : [ "administrative_area_level_2", "political" ]
        },
        {
          "long_name" : "England",
          "types" : [ "administrative_area_level_1", "political" ]
        },
        {
          "long_name" : "United Kingdom",
          "short_name" : 2,
          "types" : [ "country", "political" ]
        },
        {
          "long_name" : "United Kingdom",
          "short_name" : [1],
          "types" : [ "country", "political" ]
        }
      ],
      "formatted_address" : "London, UK",
      "geometry" : {
        "bounds" : {
          "northeast" : {
            "lat" : 51.6723432,
            "lng" : 0.148271
          },
          "southwest" : {
            "lat" : 51.38494009999999,
            "lng" : -0.3514683
          }
        },
        "location" : {
          "lat" : 51.5073509,
          "lng" : -0.1277583
        },
        "location_type" : "APPROXIMATE",
        "viewport" : {
          "northeast" : {
            "lat" : 51.6723432,
            "lng" : 0.1482319
          },
          "southwest" : {
            "lat" : 51.38494009999999,
            "lng" : -0.3514683
          }
        }
      },
      "place_id" : "ChIJdd4hrwug2EcRmSrV3Vo6llI",
      "types" : [ "locality", "political" ]
    }
  ],
  "status" : "OK"
}

`;

const json2 = `
{
    shane: {
        "user": {
          "name": "shane",
          "pets": "1"
        }
    },
    kittie: {
        "user": {
          "name": "shane",
          "age": 10,
          "pets": 1
        }
    },
    simon: {
        "user": {
          "name": "shane",
          "age": 10,
          "pets": false
        }
    },
    yvonne: {
        "user": {
          "name": "shane",
          "age": 10,
          "pets": null
        }
    }
}
`

const outgoing = transform(parse(json2, defaults), defaults);
// console.log(JSON.stringify(outgoing, null, 2));

var res1 = ts.createSourceFile('module', '', ts.ModuleKind.None);
//
const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
});
// console.log(outgoing);
outgoing.forEach(item => {
    console.log(printer.printNode(ts.EmitHint.Unspecified, item, res1));
})
//
// function namedProp(member) {
//     const qs = nq(member.name);
//
//     const output = qs.needsQuotes ? qs.quotedValue : member.name;
//
//     const prop = ts.createNode(ts.SyntaxKind.PropertySignature);
//     prop.name = ts.createIdentifier(output);
//
//     if (member.optional) {
//         prop.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
//     }
//
//     return prop;
// }
//
// const stack = [];
//
// // console.log(printer.printNode(ts.EmitHint.Unspecified, int, res1));
//
// getStatements(outgoing);
//
// function getStatements(stackItems) {
//     return stackItems.forEach(node => {
//         switch(node.kind) {
//             case ts.SyntaxKind.InterfaceDeclaration: {
//                 const item   = ts.createNode(node.kind);
//                 item.name    = ts.createIdentifier(node.name);
//                 item.members = getMembers(node.members);
//                 stack.push(item);
//             }
//         }
//     });
// }
//
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