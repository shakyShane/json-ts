import {parse} from "./parser";
import {print} from "./printer";
import {transform} from "./transformer";

export interface JsonTsOptions {
    namespace?: string
    flow?: boolean
    prefix?: string,
    rootName?: string
}

const defaults = {
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
    const printed = print(transformed, merged);
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