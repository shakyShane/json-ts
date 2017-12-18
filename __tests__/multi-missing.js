const {json2tsMulti} = require('../');

const json = `{
  "name": "Shane"
}
`;
const json2 = `{
  "pets": "kittie"
}
`;

const expected = `
interface IRootObject {
    pets?: string;
    name?: string;
}
`;

it('multiple inputs - when one is missing in each', function() {
    expect(json2tsMulti([json2, json])).toEqual(expected.slice(1));
});
