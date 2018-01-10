import * as ts from 'typescript';
import {parse} from "./parser";
import {print, printLiteral} from "./printer";
import {transform} from "./transformer";
import {collapseInterfaces} from "./collapse-interfaces";

export interface JsonTsOptions {
    namespace?: string
    flow?: boolean
    prefix?: string
    rootName?: string
}

export const defaults = {
    prefix: "I",
    rootName: "RootObject"
};

export function json2ts(validJsonString: string, options: JsonTsOptions = {}): string {
    const mergedOptions = {
        ...defaults,
        ...options
    };
    const {stack, inputKind} = parse(validJsonString, mergedOptions);
    switch (inputKind) {
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.ObjectLiteralExpression: {
            const transformed = transform(stack, mergedOptions);
            const flattened = collapseInterfaces(transformed);
            const printed = print(flattened, inputKind, mergedOptions);
            return printed;
        }
        default: {
            const printed = printLiteral(stack[0], inputKind, mergedOptions);
            return printed;
        }
    }
}

export function json2tsMulti(validJsonStrings: string[], options: JsonTsOptions = {}): string {
    const inputKinds = new Set([]);
    const mergedOptions = {
        ...defaults,
        ...options
    };
    const joined = validJsonStrings.reduce((all, json) => {
        const {stack, inputKind} = parse(json, mergedOptions);
        inputKinds.add(inputKind);
        const transformed = transform(stack, mergedOptions);
        return all.concat(transformed);
    }, []);

    if (inputKinds.size > 1) {
        // todo handle mixed types
    }

    const flattened = collapseInterfaces(joined);
    const printed = print(flattened, Array.from(inputKinds)[0], mergedOptions);
    return printed;
}

export {
    parse,
    print,
    transform
}

declare var window;
if ((typeof window !== 'undefined') && ((typeof window.json2ts) === 'undefined')) {
    window.json2ts = json2ts;
    window.json2ts.parse = parse;
    window.json2ts.transform = transform;
    window.json2ts.print = print;
}
