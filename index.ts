import * as assert from 'assert';
import {parse} from "./parser";
import {print} from "./printer";
import {transform} from "./transformer";

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
const parsed = parse(json);
const transformed = transform(parsed);
const printed = print(transformed);

assert.equal(printed, expected.slice(1)); // ignore new line at beginning