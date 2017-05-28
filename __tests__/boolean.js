const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "alive": true,
  "sad": false,
  "bools": [true, false]
}
`;

const expected = `
interface IRootObject {
    alive: boolean;
    sad: boolean;
    bools: boolean[];
}
`;

it('bools', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
