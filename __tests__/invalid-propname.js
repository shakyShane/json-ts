const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
    "in^valid": "here";
}
`;

const expected = `
interface IRootObject {
    'in^valid': string;
}
`;

it('quotes invalid property names', function() {
  expect(json2ts(json)).toEqual(expected.slice(1));
});
