const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "ids": [1, "2"]
}
`;

const expected = `
interface IRootObject {
    ids: (number | string)[];
}
`;

it('works with array of mixed number/strings (any)', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
