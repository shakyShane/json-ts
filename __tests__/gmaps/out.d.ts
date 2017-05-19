interface IRootObject {
  results: IResultsItem[];
  status: string;
}

interface IResultsItem {
  address_components: IAddressComponentsItem[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  types: string[];
}

interface IAddressComponentsItem {
  long_name: string;
  short_name: string;
  types: string[];
}

interface IGeometry {
  bounds: IBounds;
  location: ILocation;
  location_type: string;
  viewport: IViewport;
}

interface IBounds {
  northeast: INortheast;
  southwest: ISouthwest;
}

interface INortheast {
  lat: number;
  lng: number;
}

interface ISouthwest {
  lat: number;
  lng: number;
}

interface ILocation {
  lat: number;
  lng: number;
}

interface IViewport {
  northeast: INortheast;
  southwest: ISouthwest;
}

