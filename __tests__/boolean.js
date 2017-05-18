const {json2ts} = require('../');
const assert = require('assert');

const json = `{
  "alive": true,
  "sad": false
}
`;

const expected = `
interface IRootObject {
  alive: boolean;
  sad: boolean;
}
`;

it('bools', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});