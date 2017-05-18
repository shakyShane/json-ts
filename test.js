const {json2ts} = require('./');
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

assert.equal(json2ts(json), expected.slice(1));