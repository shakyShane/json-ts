const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `"6345634563"`;

const expected = `
type IRootObject = string;
`;

it('works with top level string', function() {
    expect(json2ts(json)).toEqual(expected.slice(1, -1));
});

it('works with top level number', function() {
    expect(json2ts(1)).toEqual(`type IRootObject = number;`);
});

it('works with top level null', function() {
    expect(json2ts('null')).toEqual(`type IRootObject = null;`);
});
