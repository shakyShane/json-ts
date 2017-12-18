const {json2tsMulti} = require('../');

// language=JSON
const json = `
  {
    "status": "success",
    "cart": {
      "basket": {
        "type": "",
        "tax_label": "(Ex VAT)"
      }
    }
  }
`;

// language=JSON
const json2 = `
  {
    "status": "success",
    "cart": {
      "basket": {
        "type": "collect",
        "tax_label": "(Ex VAT)",
        "branch": "S01"
      }
    }
  }
`;

const expected = `
interface IRootObject {
    status: string;
    cart: ICart;
}
interface ICart {
    basket: IBasket;
}
interface IBasket {
    type: string;
    tax_label: string;
    branch?: string;
}
`;

it('multiple inputs - when one is missing in each', function() {
    expect(json2tsMulti([json2, json])).toEqual(expected.slice(1));
    // console.log(json2tsMulti([json2, json]));
});
