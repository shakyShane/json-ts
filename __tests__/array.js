const {json2ts} = require('../');
const assert = require('assert');

const json = `{
  "ids": [1, 2, 3]
`;

const expected = `
interface IRootObject {
  ids: number[];
}
`;

it('works with array of numbers', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});