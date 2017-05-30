const json2ts = require('../').json2ts;
const assert = require('assert');

//language=JSON
const json = `{
  "users": [
    {
      "name": "shane"
    },
    {
      "name": "sally"
    }
  ]
}
`;

const expected = `
interface IRootObject {
    users: IUsersItem[];
}
interface IUsersItem {
    name: string;
}
`;

it('works with array of mixed number/strings (any)', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
