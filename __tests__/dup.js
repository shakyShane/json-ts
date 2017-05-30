const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "summary": {
    "loc": {
        "lat": 10, 
        "lng": 11
    }
  },
  "loc": {
    "lat": 10, 
    "lng": 11
  }
}
`;

const expected = `
interface IRootObject {
    summary: ISummary;
    loc: ILoc;
}
interface ISummary {
    loc: ILoc;
}
interface ILoc {
    lat: number;
    lng: number;
}
`;

it('works when prop name + members match', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
