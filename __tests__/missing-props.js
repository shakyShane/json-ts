const json2ts = require('../').json2ts;

const json = `
  {
    "items": [
      {
        "pets": [1, 2]
      },
      {
        "name": "shane"
      }
    ]
  }
`;

const expected = `
interface IRootObject {
    items: IItemsItem[];
}
interface IItemsItem {
    pets?: number[];
    name?: string;
}
`;

it('can mark multiple missing props', function() {
    // console.log(json2ts(json));
    expect(json2ts(json)).toEqual(expected.slice(1));
});
