const json2ts = require('../').json2ts;
const assert = require('assert');

//language=JSON
const json = `{
  "carBrands": [
    {
      "brandName": "shane"
    },
    {
      "brandName": "sally"
    }
  ]
}
`;

const expected = `
interface IRootObject {
    carBrands: ICarBrandsItem[];
}
interface ICarBrandsItem {
    brandName: string;
}
`;

it('works with array of mixed number/strings (any) with camel case array name', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
