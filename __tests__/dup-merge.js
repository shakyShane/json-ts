const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `
  {
    "items": [
      {
        "attribute_code": "category_ids",
        "value": [
          "3",
          "5"
        ]
      },
      {
        "attribute_code": "options_container",
        "value": "container2"
      }
    ]
  }
`;

const expected = `
interface IRootObject {
    items: IItemsItem[];
}
interface IItemsItem {
    attribute_code: string;
    value: string[] | string;
}
`;

it('can collapse interfaces into union types', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
