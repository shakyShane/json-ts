const json2ts = require('../').json2ts;
const assert = require('assert');

const json = `
{
  "id": 15,
  "sku": "24-UG06",
  "name": "Affirm Water Bottle",
  "attribute_set_id": 11,
  "price": 7,
  "status": 1,
  "visibility": 4,
  "type_id": "simple",
  "created_at": "2016-07-11 10:19:09",
  "updated_at": "2016-07-11 10:19:09",
  "extension_attributes": [],
  "product_links": [],
  "options": [],
  "media_gallery_entries": [
    {
      "id": 19,
      "media_type": "image",
      "label": "Image",
      "position": 1,
      "disabled": false,
      "types": [
        "image",
        "small_image",
        "thumbnail"
      ],
      "file": "\/u\/g\/ug06-lb-0.jpg"
    },
    {
      "id": 20,
      "media_type": "image",
      "label": "Image",
      "position": 2,
      "disabled": false,
      "types": [
        "image",
        "small_image",
        "thumbnail"
      ],
      "file": "\/u\/g\/ug07-bk-0.jpg"
    },
    {
      "id": 21,
      "media_type": "image",
      "label": "Image",
      "position": 3,
      "disabled": false,
      "types": [
        "image",
        "small_image",
        "thumbnail"
      ],
      "file": "\/u\/g\/ug07-bk-0_alt1.jpg"
    },
    {
      "id": 22,
      "media_type": "image",
      "label": "Image",
      "position": 4,
      "disabled": false,
      "types": [
        "image",
        "small_image",
        "thumbnail"
      ],
      "file": "\/u\/g\/ug07-bk-0_alt1.jpg"
    }
  ],
  "tier_prices": [],
  "custom_attributes": [
    {
      "attribute_code": "description",
      "value": "<p>You'll stay hydrated with ease with the Affirm Water Bottle by your side or in hand. Measurements on the outside help you keep track of how much you're drinking, while the screw-top lid prevents spills. A metal carabiner clip allows you to attach it to the outside of a backpack or bag for easy access.<\/p>\n<ul>\n<li>Made of plastic.<\/li>\n<li>Grooved sides for an easy grip.<\/li>\n<\/ul>"
    },
    {
      "attribute_code": "image",
      "value": "\/u\/g\/ug06-lb-0.jpg"
    },
    {
      "attribute_code": "small_image",
      "value": "\/u\/g\/ug06-lb-0.jpg"
    },
    {
      "attribute_code": "thumbnail",
      "value": "\/u\/g\/ug06-lb-0.jpg"
    },
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
    },
    {
      "attribute_code": "required_options",
      "value": "0"
    },
    {
      "attribute_code": "has_options",
      "value": "0"
    },
    {
      "attribute_code": "url_key",
      "value": "affirm-water-bottle"
    },
    {
      "attribute_code": "tax_class_id",
      "value": "2"
    },
    {
      "attribute_code": "activity",
      "value": "8,9,17,11"
    },
    {
      "attribute_code": "material",
      "value": "44"
    },
    {
      "attribute_code": "gender",
      "value": "80,81,82,83,84"
    },
    {
      "attribute_code": "category_gear",
      "value": "87,89"
    }
  ]
}
`;

const expected = `
interface IRootObject {
    id: number;
    sku: string;
    name: string;
    attribute_set_id: number;
    price: number;
    status: number;
    visibility: number;
    type_id: string;
    created_at: string;
    updated_at: string;
    extension_attributes: any[];
    product_links: any[];
    options: any[];
    media_gallery_entries: IMediaGalleryEntriesItem[];
    tier_prices: any[];
    custom_attributes: ICustomAttributesItem[];
}
interface IMediaGalleryEntriesItem {
    id: number;
    media_type: string;
    label: string;
    position: number;
    disabled: boolean;
    types: string[];
    file: string;
}
interface ICustomAttributesItem {
    attribute_code: string;
    value: string | string[];
}
`;

it('works with large objects', function() {
    expect(json2ts(json)).toEqual(expected.slice(1));
});
