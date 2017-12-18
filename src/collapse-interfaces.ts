import * as ts from 'typescript';
import {Set} from 'immutable';
import {namedProp} from "./transformer";
import {isEmptyArrayType, membersMatch} from "./util";

export function collapseInterfaces(interfaces: any[]): any[] {
    return interfaces.reduce((accInterfaces, current) => {

        const currentName = current.name.text;
        const currentMemberNames = Set(current.members.map(x => (x.name || x.label).text));
        const matchingInterfaceIndex = accInterfaces.findIndex(x => (x.name || x.label).text === currentName);

        if (matchingInterfaceIndex === -1) {
            return accInterfaces.concat(current);
        }

        return accInterfaces.map((int, index) => {

            if (index !== matchingInterfaceIndex) {
                return int;
            }

            const prevMemberNames = Set(int.members.map(x => (x.name || x.label).text));

            // if the current interface has less props than a previous one
            // we need to back-track and make the previous one optional
            if (currentMemberNames.size < prevMemberNames.size) {
                // elements that existed before, but not in the current
                int.members.forEach(mem => {
                    if (!currentMemberNames.has(mem.name.text)) {
                        mem.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
                    }
                });
            }

            // Modify members based on missing props, union types etc
            modifyMembers(int.members, current.members);

            return int;
        });
    }, []);
}

function modifyMembers(interfaceMembers, currentMembers) {
    currentMembers.forEach(mem => {

        const existingIndex = interfaceMembers.findIndex(x => x.name.text === mem.name.text);
        const existingMember = interfaceMembers[existingIndex];

        // Here, the current member does NOT already exist in this
        // interface, so we add it, but as optional
        if (!existingMember) {
            mem.questionToken = ts.createNode(ts.SyntaxKind.QuestionToken);
            interfaceMembers.push(mem);
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
                        interfaceMembers[existingIndex] = existingMember;
                    }
                } else { // not a union yet, so create one for next time around

                    // was this previously marked as an empty array? eg: any[]
                    // if so & the next item is NOT, then we can ignore the any[]
                    if (isEmptyArrayType(existingMember) && !isEmptyArrayType(mem)) {
                        updatedMember.type = ts.createNode(ts.SyntaxKind.ArrayType);
                        updatedMember.type.elementType = mem.type.elementType;
                        interfaceMembers[existingIndex] = updatedMember;
                    } else {
                        // If the INCOMING member type is an empty array, but we already have an array element with items, we bail
                        if (isEmptyArrayType(mem) && existingMember.type.kind === ts.SyntaxKind.ArrayType && (!isEmptyArrayType(existingMember))) {
                            return;
                        }
                        const memberNodes = [existingMember.type, mem.type];
                        updatedMember.type = ts.createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, memberNodes);
                        interfaceMembers[existingIndex] = updatedMember;
                    }
                }
            }
        }
    });
}