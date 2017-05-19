const {json2ts} = require('../');
const assert = require('assert');

const json = `{
  "geo": {
    "lat": 2,
    "lng": 3
  },
  "loc": {
    "lat": 2,
    "lng": 3
  },
  "geometry": {
    "bounds": {
      "lat": 2,
      "lng": 3
    }
  }
}
`;

const expected = `
interface IRootObject {
  geo: IGeo;
  loc: IGeo;
  geometry: IGeometry;
}

interface IGeo {
  lat: number;
  lng: number;
}

interface IGeometry {
  bounds: IGeo;
}
`;

it('works when prop names differ, but members match', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});