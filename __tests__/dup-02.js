const {json2ts} = require('../');
const assert = require('assert');

const json = `{
  "user": {
    "name": "Shane",
    "age": 19
  },
  "admin": {
    "name": "Shane",
    "age": 20
  }
}
`;

const expected = `
interface IRootObject {
  user: IUser;
  admin: IUser;
}
`;

it('works when prop names differ, but members match', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});