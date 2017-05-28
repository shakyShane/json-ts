const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `
{
    "num": 120,
    "neg": -120,
    "decimal": 1.2,
    "nums": [1, -1, 1.4]
}
`;

const expected = `
interface IRootObject {
    num: number;
    neg: number;
    decimal: number;
    nums: number[];
}
`;

it('works with array of numbers', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
