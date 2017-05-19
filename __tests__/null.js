const {json2ts} = require('../');
const assert = require('assert');

const json = `{
  "alive": null,
  "nulls": [null, null]
}
`;

const expected = `
interface IRootObject {
  alive: null;
  nulls: null[];
}
`;

it('nulls', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});