const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "date": "01/02/03",
  "summary": {
    "url": "http://example.com", 
    "path": "/where",
    "loc": {
        "lat": 10, 
        "lng": 11,
    }
  }
}
`;

const expected = `
interface IRootObject {
    date: string;
    summary: ISummary;
}
interface ISummary {
    url: string;
    path: string;
    loc: ILoc;
}
interface ILoc {
    lat: number;
    lng: number;
}
`;

it('works 1 level of depth', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
