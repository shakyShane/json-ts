const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `
  {
    "items": [
      {
        "attribute_code": "category_ids",
        "value": [1]
      },
      {
        "attribute_code": "category_ids_2",
        "value": [2, 3]
      }
    ]
  }
`;

const expected = `
declare namespace Project {
    export interface IRootObject {
        items: IItemsItem[];
    }
    export interface IItemsItem {
        attribute_code: string;
        value: number[];
    }
}
`;

it('can wrap in namespace', function() {
    expect(json2ts(json, {namespace: 'Project'})).toEqual(expected.slice(1));
});
