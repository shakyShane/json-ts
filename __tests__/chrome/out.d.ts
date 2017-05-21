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
  parameters: IParametersItem[];
}

interface IParametersItem {
  name: string;
  type?: string;
  description?: string;
  $ref?: string;
  optional?: boolean;
}

interface ITypesItem {
  id: string;
  type: string;
  'enum'?: string[];
  description?: string;
  properties?: IPropertiesItem[];
  experimental?: boolean;
  items?: IItems;
}

interface IReturnsItem {
  name: string;
  type?: string;
  $ref?: string;
  experimental?: boolean;
  description?: string;
  items?: IItems;
}

interface IPropertiesItem {
  name: string;
  type?: string;
  optional: boolean;
  description: string;
  $ref?: string;
}

interface IItems {
  type: string;
  description: string;
}

