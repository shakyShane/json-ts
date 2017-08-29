const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "alive": true,
  "sad": false,
  "bools": [true, false]
}
`;

const expected = `
// @flow
export type IRootObject = {
    alive: boolean;
    sad: boolean;
    bools: boolean[];
};
`;

it('supports flow output', function() {
    expect(json2ts(json, {flow: true})).toEqual(expected.slice(1));
});
