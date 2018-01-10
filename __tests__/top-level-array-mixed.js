const json2ts = require('../').json2ts;
const assert = require('assert');

// language=JSON
const json = `
[
    {
      "name": "Shane" 
    },
    2,
    "oops"
]
`;

const expected = `
type IRootObject = any[];
interface IRootObjectItem {
    name: string;
}
`;

it('works with top level array + mixed values', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
