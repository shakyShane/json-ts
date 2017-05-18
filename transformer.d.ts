import { ParsedNode } from "./parser";
export interface InterfaceNode {
    name: string;
    original: string;
    members: string[];
}
export declare function transform(stack: ParsedNode[]): InterfaceNode[];
