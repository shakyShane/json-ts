const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "POST /here": {
    "body": {
      "name": "string"
    }
  }
}
`;

const expected = `
interface IRootObject {
    'POST /here': {
        body: IBody;
    };
}
interface IBody {
    name: string;
}
`;

it('bails on interface extraction if name invalid', function() {
  expect(json2ts(json)).toEqual(expected.slice(1));
});
