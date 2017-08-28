import {parse} from "./parser";
import {print} from "./printer";
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
    const merged = {
        ...defaults,
        ...options
    };
    const parsed = parse(validJsonString, merged);
    const transformed = transform(parsed, merged);
    const flattened = collapseInterfaces(transformed);
    const printed = print(flattened, merged);
    return printed;
}

export function json2tsMulti(validJsonStrings: string[], options: JsonTsOptions = {}): string {
    const merged = {
        ...defaults,
        ...options
    };
    const joined = validJsonStrings.reduce((all, json) => {
        const parsed = parse(json, merged);
        const transformed = transform(parsed, merged);
        return all.concat(transformed);
    }, []);

    const flattened = collapseInterfaces(joined);
    const printed = print(flattened, merged);
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
