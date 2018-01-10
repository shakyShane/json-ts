const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `
[1, 2]
`;

const expected = `
type IRootObject = number[];
`;

it.only('works with top level array', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
