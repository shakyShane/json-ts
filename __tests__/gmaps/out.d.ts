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
    location: INortheast;
    location_type: string;
    viewport: IBounds;
}

interface IBounds {
    northeast: INortheast;
    southwest: INortheast;
}

interface INortheast {
    lat: number;
    lng: number;
}

