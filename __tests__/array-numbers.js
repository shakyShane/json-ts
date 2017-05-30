const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `{
  "ids": [1, 2, 3],
  "user": {
    "pets": ["dog", "cat"]
  }
}
`;

const expected = `
interface IRootObject {
    ids: number[];
    user: IUser;
}
interface IUser {
    pets: string[];
}
`;

it('works with array of numbers', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
