#!/usr/bin/env node
import minimist = require('minimist');
import stdin = require('get-stdin');
import {json2ts, json2tsMulti} from './';
import {fromJS, OrderedSet} from 'immutable';
import {join, parse, ParsedPath} from "path";
import {existsSync, readFile, readFileSync} from "fs";
const argv = minimist(process.argv.slice(2));

// unique input
const inputs = OrderedSet<string>(argv._);

// defaults
const defaults = {
    stdin: false,
    namespace: false,
    flow: false
};

// merged options with defaults
const options = {
    ...defaults,
    ...argv
};

if (options.stdin) {
    stdin().then((str: string) => {
        if (str === '') {
            console.error('no input provided');
        } else {
            try {
                JSON.parse(str);
                console.log(json2ts(str, options));
            } catch (e) {
                console.error('Invalid JSON');
                console.error(e.message);
            }
        }
    })
    .catch(err => {
        console.error(err);
    })
} else {
    if (inputs.size === 0) {
        console.error('Oops! You provided no inputs');
        console.log(`
You can pipe JSON to this program with the --stdin flag:

    curl http://example.com/some-json | json-ts --stdin
    
Or, provide path names:

    json-ts path/to/my-file.json
        `);
    } else {
        const queue = inputs
            .map(input => {
                return {
                    input,
                    parsed: parse(input),
                };
            })
            .map(incoming => {
                return {
                    incoming,
                    resolved: resolveInput(incoming, process.cwd())
                }
            });

        const withErrors = queue.filter(x => x.resolved.errors.length > 0);
        const withoutErrors = queue.filter(x => x.resolved.errors.length === 0);
        if (withErrors.size) {
            console.log('Sorry, there were errors with your input.');
            withErrors.forEach(function (item) {
                console.log('');
                console.log(`  ${item.incoming.input}:`);
                console.log('    ', item.resolved.errors[0].error.message);
            })
        } else {
            const strings = withoutErrors.map(item => {
                return item.resolved.content;
            });
            console.log(json2tsMulti((strings as any), options));
        }
    }
}

interface IIncomingInput {
    input: string,
    parsed: ParsedPath,
}
interface InputError {
    kind: string,
    error: Error
}
interface IResolvedInput {
    errors: InputError[],
    content?: string
}

function resolveInput(incoming: IIncomingInput, cwd): IResolvedInput {
    const absolute = join(cwd, incoming.parsed.dir, incoming.parsed.base);
    if (!existsSync(absolute)) {
        return {
            errors: [{
                kind: 'FileNotFound',
                error: new Error(`File not found`)
            }]
        }
    }
    const data = readFileSync(absolute, 'utf8');
    try {
        JSON.parse(data);
        return {
            errors: [],
            content: data
        }
    } catch (e) {
        return {
            errors: [{
                kind: 'InvalidJson',
                error: e
            }]
        }
    }
}
// console.log('options:', options);
// console.log('inputs:', inputs);
// console.log('args', argv);
