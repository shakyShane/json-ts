#!/usr/bin/env node
import minimist = require('minimist');
import stdin = require('get-stdin');
import {json2ts} from './';
import {fromJS, OrderedSet} from 'immutable';
const argv = minimist(process.argv.slice(2));

// unique input
const inputs = OrderedSet(argv._);

// defaults
const defaults = {
    stdin: false,
};

// merged options with defaults
const options = fromJS(defaults).merge(argv);

if (options.get('stdin')) {
    stdin().then((str: string) => {
        if (str === '') {
            console.error('no input provided');
        } else {
            console.log(json2ts(str));
        }
    })
    .catch(err => {
        console.error(err);
    })
} else {
    // todo support filenames/urls for input
    console.log('Sorry the only input type supported right now is stdin');
    console.log('pipe some data and then provide ');
}

// console.log('options:', options);
// console.log('inputs:', inputs);
// console.log('args', argv);
