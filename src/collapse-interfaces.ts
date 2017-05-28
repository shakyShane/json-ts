import * as ts from 'typescript';
import {Set} from 'immutable';
import {namedProp} from "./transformer";

function membersMatch(first, second) {
    if (first.kind !== second.kind) {
        return false;
    }
    if (first.name.text !== second.name.text) {
        return false;
    }
    if (first.type.kind !== second.type.kind) {
        return false;
    }
    if (first.type.kind === ts.SyntaxKind.ArrayType && second.type.kind === ts.SyntaxKind.ArrayType) {
        if (first.type.elementType.kind !== second.type.elementType.kind) {
            return false;
        }
    }
    return true;
}

function isEmptyArrayType(member) {
    if (member.type.kind === ts.SyntaxKind.ArrayType) {
        if (member.type.elementType.kind === ts.SyntaxKind.AnyKeyword) {
            return true;
        }
    }
    return false;
}

export function collapseInterfaces(interfaces: any[]): any[] {
    return interfaces.reduce((acc, current) => {

        const currentName = current.name.text;
        const currentMemberNames = Set(current.members.map(x => (x.name || x.label).text));

        const matchingInterfaceIndex = acc.findIndex(x => (x.name || x.label).text === currentName);

        if (matchingInterfaceIndex > -1) {
            return acc
                .map((int, index) => {
                    if (index === matchingInterfaceIndex) {

                        const prevMemberNames = Set(int.members.map(x => (x.name || x.label).text));

                        // if the current interface has less props than a previous one
                        // we need to back-track and make the previous one optional
                        if (currentMemberNames.size < prevMemberNames.size) {
                            // elements that existed before, but not in the current
                            const missing = int.members.filter(x => !currentMemberNames.has(x.name.text));
                            missing.forEach(mem => {
                                mem.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
                            });
                        }

                        if (currentMemberNames.has(int.name.text)) {
                            console.log('exists in both, maybe union', int.name.text);
                        } else {
                            // console.log('incoming current does not exist in prev');
                            const existinMemberNames = Set(int.members.map(x => x.name.text));
                            const newMembers = int.members.slice();

                            // Loop over incoming current members
                            current.members.forEach(mem => {

                                const existingIndex = int.members.findIndex(x => x.name.text === mem.name.text);
                                const existingMember = int.members[existingIndex];

                                // Here, the current member does NOT already exist in this
                                // interface, so we add it, but as optional
                                if (!existingMember) {
                                    mem.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
                                    newMembers.push(mem);
                                } else {
                                    // here it exists in both, are the types the same?
                                    // console.log(ts.SyntaxKind[mem.type.kind]);
                                    // console.log(existingMember.kind, mem.kind);
                                    if (membersMatch(existingMember, mem)) {
                                        return;
                                    } else {
                                        const updatedMember = namedProp({name: existingMember.name.text});
                                        // const exists  = existingMember.type.types.some(x => x.kind === mem.kind);

                                        // already a union, so just push a new type
                                        if (existingMember.type.kind === ts.SyntaxKind.UnionType) {
                                            const asSet = Set(existingMember.type.types.map(x => x.kind));
                                            if (!asSet.contains(mem.type.kind)) {
                                                existingMember.type.types.push(mem.type);
                                                newMembers[existingIndex] = existingMember;
                                            }
                                        } else { // not a union yet, so create one for next time around

                                            // was this previously marked as an empty array? eg: any[]
                                            // if so & the next item is NOT, then we can ignore the any[]
                                            if (isEmptyArrayType(existingMember) && !isEmptyArrayType(mem)) {
                                                updatedMember.type = ts.createNode(ts.SyntaxKind.ArrayType);
                                                updatedMember.type.elementType = mem.type.elementType;
                                                newMembers[existingIndex] = updatedMember;
                                            } else {
                                                // If the INCOMING member type is an empty array, but we already have an array element with items, we bail
                                                if (isEmptyArrayType(mem) && existingMember.type.kind === ts.SyntaxKind.ArrayType && (!isEmptyArrayType(existingMember))) {
                                                    return;
                                                }
                                                const memberNodes = [existingMember.type, mem.type];
                                                updatedMember.type = ts.createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, memberNodes);
                                                newMembers[existingIndex] = updatedMember;
                                            }
                                        }
                                    }
                                    // console.log(ts.compareDataObjects(existingMember, mem));
                                }
                            });

                            int.members = newMembers;
                            return int;
                        }
                    }
                    return int;
                });
        } else {
            // console.log('Agressive merge here?')
        }

        return acc.concat(current);
    }, []);
}