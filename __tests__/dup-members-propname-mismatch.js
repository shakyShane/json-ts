const json2ts = require('../').json2ts;
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
    loc: ILoc;
    geometry: IGeometry;
}
interface IGeo {
    lat: number;
    lng: number;
}
interface ILoc {
    lat: number;
    lng: number;
}
interface IGeometry {
    bounds: IBounds;
}
interface IBounds {
    lat: number;
    lng: number;
}
`;

it('works when prop names differ, but members match', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
