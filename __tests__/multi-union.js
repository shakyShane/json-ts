const {json2tsMulti} = require('../');

const json = `{
  "name": "Shane"
}
`;
const json2 = `{
  "name": null 
}
`;

const expected = `
interface IRootObject {
    name: string | null;
}
`;

it('multiple inputs - union', function() {
    expect(json2tsMulti([json, json2])).toEqual(expected.slice(1));
});
