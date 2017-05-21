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
  extension_attributes: Array<any>;
  product_links: Array<any>;
  options: Array<any>;
  media_gallery_entries: IMediaGalleryEntriesItem[];
  tier_prices: Array<any>;
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
  value: string|string[];
}

