const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "user": {
    "name": "Shane",
    "age": 19
  },
  "admin": {
    "user": {
      "name": "Shane",
      "age": 20
    }
  }
}
`;

const expected = `
interface IRootObject {
    user: IUser;
    admin: IAdmin;
}
interface IUser {
    name: string;
    age: number;
}
interface IAdmin {
    user: IUser;
}
`;

it('works when prop names differ, but members match', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
