interface IRootObject {
  format: string;
  version: string;
  result: IResult;
}

interface IResult {
  _about: string;
  definition: string;
  extendedMetadataVersion: string;
  first: string;
  hasPart: string;
  isPartOf: string;
  items: IItemsItem[];
  itemsPerPage: number;
  next: string;
  page: number;
  startIndex: number;
  totalResults: number;
  type: string[];
}

interface IItemsItem {
  _about: string;
  created: ICreated;
  identifier: IIdentifier;
  label: IIdentifier;
  numberOfSignatures: number;
  status: string;
}

interface ICreated {
  _value: string;
  _datatype: string;
}

interface IIdentifier {
  _value: string;
}

