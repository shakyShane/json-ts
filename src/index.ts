import {parse} from "./parser";
import {print} from "./printer";
import {transform} from "./transformer";

export interface JsonTsOptions {
    namespace?: string
    flow?: boolean
}

const defaults = {

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