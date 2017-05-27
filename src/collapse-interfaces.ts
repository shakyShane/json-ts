import * as ts from 'typescript';
import {List, Set} from 'immutable';
import {ImmutableNode, log, namedProp} from "./transformer";

export function collapseInterfaces(interfaces: List<ImmutableNode>): List<ImmutableNode> {
    return interfaces.reduce((acc, current) => {

        const currentName = current.name.text;
        const currentMemberNames = Set(current.members.map(x => x.name.text));
        
        const matchingInterfaceIndex = acc.findIndex(x => x.name.text === currentName);

        // console.log(current.get('members').map(x => x.delete('optional')).toJS());
        // console.log(current.get('members'));

        if (matchingInterfaceIndex > -1) {
            return acc
                .map((int, index) => {
                    if (index === matchingInterfaceIndex) {
                        if (currentMemberNames.has(int.name.text)) {
                            console.log('exists in both, maybe union', int.name.text);
                        } else {
                            const existinMemberNames = Set(int.members.map(x => x.name.text));
                            const newMembers = int.members.slice();

                            // loop over incoming and add missing ones
                            current.members.forEach(mem => {
                                console.log(ts.SyntaxKind[mem.type.kind]);
                                const existingIndex = int.members.findIndex(x => x.name.text === mem.name.text);
                                const existingMember = int.members[existingIndex];
                                if (!existingMember) {
                                    newMembers.push(mem);
                                } else {
                                    // here it exists in both, are the types the same?
                                    // console.log(ts.SyntaxKind[mem.type.kind]);
                                    // console.log(existingMember.kind, mem.kind);
                                    if (ts.compareDataObjects(existingMember, mem)) {
                                        return;
                                    } else {
                                        const updatedMember = namedProp({name: existingMember.name.text});

                                        // already a union, so just push a new type
                                        if (existingMember.type.kind === ts.SyntaxKind.UnionType) {
                                            existingMember.type.types.push(mem.type);
                                            newMembers[existingIndex] = existingMember;
                                        } else { // not a union yet, so create one for next time around
                                            const memberNodes = [existingMember.type, mem.type];
                                            updatedMember.type = ts.createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, memberNodes);
                                            newMembers[existingIndex] = updatedMember;
                                        }
                                    }
                                    // console.log(ts.compareDataObjects(existingMember, mem));
                                }
                            });

                            int.members = newMembers;
                            return int;
                        }
                      // log(int.members);
                      // log(current.members);
                    }
                    return int;
                });
        //     return acc.updateIn([matching, 'members'], function (members) {
        //         return members
        //             .map(x => {
        //                 if (currentMemberNames.has(x.get('name'))) {
        //                     const matching = current.get('members').find(curr => curr.get('name') === x.get('name'))
        //                     if (matching.get('kind') !== x.get('kind')) {
        //
        //                         return x.set('kind', ts.SyntaxKind.UnionType)
        //                             .set('_kind', ts.SyntaxKind[ts.SyntaxKind.UnionType])
        //                             .update('types', types => types.concat(matching.get('types')))
        //                     }
        //                     return x;
        //                 } else {
        //                     return x.set('optional', true);
        //                 }
        //             })
        //         // .mergeDeep(current.get('members'))
        //     })
        }
        // console.log(current);

        return acc.push(current);
    }, List([]) as any);
    // console.log(interfaces);
    return interfaces;
}