// function mergeDuplicateInterfaces(interfaces: List<ImmutableNode>): List<ImmutableNode> {
//     return interfaces.reduce((acc, current) => {
//
//         const currentName = current.get('name');
//         const currentMemberNames = current.get('members').map(x => x.get('name')).toSet();
//         const matching = acc.findIndex(x => x.get('name') === currentName);
//
//         // console.log(current.get('members').map(x => x.delete('optional')).toJS());
//         // console.log(current.get('members'));
//
//         if (matching > -1) {
//             return acc.updateIn([matching, 'members'], function (members) {
//                 return members
//                     .map(x => {
//                         if (currentMemberNames.has(x.get('name'))) {
//                             const matching = current.get('members').find(curr => curr.get('name') === x.get('name'))
//                             if (matching.get('kind') !== x.get('kind')) {
//
//                                 return x.set('kind', ts.SyntaxKind.UnionType)
//                                     .set('_kind', ts.SyntaxKind[ts.SyntaxKind.UnionType])
//                                     .update('types', types => types.concat(matching.get('types')))
//                             }
//                             return x;
//                         } else {
//                             return x.set('optional', true);
//                         }
//                     })
//                 // .mergeDeep(current.get('members'))
//             })
//         }
//
//         return acc.push(current);
//     }, List([]) as any);
// }