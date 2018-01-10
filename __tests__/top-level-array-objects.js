const json2ts = require('../').json2ts;
const assert = require('assert');

// language=JSON
const json = `
[
    {
      "name": "Shane" 
    },
    {
       "name": "Kittie",
       "age": 28
    }
]
`;

const expected = `
type IRootObject = IRootObjectItem[];
interface IRootObjectItem {
    name: string;
    age?: number;
}
`;

it('works with top level array + objects', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
