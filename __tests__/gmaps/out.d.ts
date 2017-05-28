interface IRootObject {
    version: IVersion;
    domains: IDomainsItem[];
}

interface IVersion {
    major: string;
    minor: string;
}

interface IDomainsItem {
    domain: string;
    experimental?: boolean;
    types?: ITypesItem[];
    commands: ICommandsItem[];
    events?: IEventsItem[];
    description?: string;
    dependencies?: string[];
    deprecated?: boolean;
}

interface ICommandsItem {
    name: string;
    description?: string;
    returns?: IReturnsItem[];
    parameters?: IParametersItem[];
    experimental?: boolean;
    redirect?: string;
    handlers?: string[];
}

interface IEventsItem {
    name: string;
    description?: string;
    parameters?: IParametersItem[];
    experimental?: boolean;
}

interface IParametersItem {
    name: string;
    type?: string;
    description?: string;
    $ref?: string;
    optional?: boolean;
    experimental?: boolean;
    'enum'?: string[];
    deprecated?: boolean;
    items?: IItems;
    minItems?: number;
}

interface ITypesItem {
    id: string;
    type: string;
    'enum'?: string[];
    description?: string;
    properties?: IPropertiesItem[];
    experimental?: boolean;
    items?: IItems;
    minItems?: number;
    maxItems?: number;
}

interface IReturnsItem {
    name: string;
    type?: string;
    $ref?: string;
    description?: string;
    experimental?: boolean;
    items?: IItems;
    optional?: boolean;
}

interface IPropertiesItem {
    name: string;
    type?: string;
    description?: string;
    optional?: boolean;
    $ref?: string;
    items?: IItems;
    experimental?: boolean;
    'enum'?: string[];
    minItems?: number;
    maxItems?: number;
}

interface IItems {
    $ref?: string;
    type?: string;
    'enum'?: string[];
    description?: string;
}
