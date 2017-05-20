import {parse} from "./parser";
import {print} from "./printer";
import {transform} from "./transformer";

export function json2ts(validJsonString: string): string {
    const parsed = parse(validJsonString);
    const transformed = transform(parsed);
    const printed = print(transformed);
    return printed;
}

export {
    parse,
    print,
    transform
}