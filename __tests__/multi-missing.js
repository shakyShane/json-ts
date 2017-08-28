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
    name?: string;
    pets?: string[];
}
`;

it.only('multiple inputs - when ones missing', function() {
    expect(json2tsMulti([json2, json])).toEqual(expected.slice(1));
});
