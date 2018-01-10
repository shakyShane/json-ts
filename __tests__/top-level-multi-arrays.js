const json2ts = require('../').json2ts;
const json2tsMulti = require('../').json2tsMulti;
const assert = require('assert');

// language=JSON
const json = `
[{"name": "kittie"}]
`;

// language=JSON
const json2 = `
[{"name": "shane", "age": 10}]
`;

const expected = `
type IRootObject = IRootObjectItem[];
interface IRootObjectItem {
    name: string;
    age?: number;
}
`;

it('works with top level array when merging', function() {
    expect(json2tsMulti([json, json2])).toEqual(expected.slice(1));
});
