import {parse} from "./parser";
import {print} from "./printer";
import {transform} from "./transformer";

export function json2ts(jsonString: string): string {
    const parsed = parse(jsonString);
    const transformed = transform(parsed);
    const printed = print(transformed);
    return printed;
}

export {
    parse,
    print,
    transform
}