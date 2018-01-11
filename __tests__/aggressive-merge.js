const json2ts = require('../').json2ts;

const json = `
{
  "id": 2,
  "level": 1,
  "children_data": [
    {
      "id": 3,
      "level": 2,
      "children_data": [
        {
          "id": 4,
          "level": 3,
          "children_data": []
        }
      ]
    }
  ]
}
`;

const expected = `
interface IRootObject {
    id: number;
    level: number;
    children_data: IRootObject[];
}
`;

it('works with array of mixed number/strings (any)', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
