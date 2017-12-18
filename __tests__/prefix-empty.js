const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `
{
  "231thing": [{"name": "darius"}, {"age": 42}]
}
`;

const expected = `
interface RootObject {
    '231thing': _231ThingItem[];
}
interface _231ThingItem {
    name?: string;
    age?: number;
}
`;

it('works with prefix=blank string and gives valid interface names', function() {
    expect(json2ts(json, {prefix: ""})).toEqual(expected.slice(1));
});
