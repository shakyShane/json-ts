interface IRootObject {
    'POST /here': {
        body: IBody;
    };
}

interface IBody {
    name: string;
}