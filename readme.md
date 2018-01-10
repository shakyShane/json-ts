[![Build Status](https://travis-ci.org/shakyShane/json-ts.svg?branch=master)](https://travis-ci.org/shakyShane/json-ts)

## `npm install -g json-ts`

> Automatically generate Typescript Definition files or Flow types from JSON input. 

> Use it via the API, CLI, or [Website](https://shakyshane.github.io/json-ts/)
 
![json-ts](https://cdn.rawgit.com/shakyShane/json-ts/37ce9b2b/json-ts2.gif)

### How does **json-ts** stack up against the competition?

|Feature   |json-ts (this library)  |[json-to-ts](https://github.com/MariusAlch/json-to-ts)   |[json2ts](http://json2ts.com/)  |
|---|---|---|---|
|simple literal types (number, string etc) |**YES**   |YES   |YES   |
|array type, all elements of same kind |**YES**   |YES   |YES   |
|merge multiple json files|**YES (cli, v1.6 & above)**   |NO   |NO   |
|optional members | **YES** | YES | NO |
|array union types | **YES**   |YES   |NO   |
|correct handling of top-level values ([strings](https://shakyshane.github.io/json-ts/#src=%22some-api-token-as-string%22), [arrays](https://shakyshane.github.io/json-ts/#src=%5B1%2C%202%2C%203%5D), [arrays of objects](https://shakyshane.github.io/json-ts/#src=%5B%0A%20%20%7B%22name%22%3A%20%22shane%22%7D%2C%0A%20%20%7B%22name%22%3A%20%22kittie%22%2C%20%22age%22%3A%2030%7D%0A%5D) [numbers](https://shakyshane.github.io/json-ts/#src=1) etc) |**YES**   |NO   |NO   |
|recursive data structures ([see here](https://github.com/shakyShane/json-ts/blob/master/__tests__/magento/categories.json)) |**YES**   |NO   |NO   |
|nested type literals (to account for invalid [interface names](https://github.com/shakyShane/json-ts/blob/master/__tests__/swagger/schema.json)) |**YES**   |YES   |NO   |
|output @flow types |**YES**   |NO   |NO   |
|Website |**[YES](https://shakyshane.github.io/json-ts/)**   |[YES](http://www.jsontots.com/)   |[YES](http://json2ts.com/)   |
|CLI |**YES**   |NO   |NO   |
|API |**YES**   |YES   |NO   |
 
## Quick-start
```bash
# install
npm install -g json-ts

# run against a single JSON file
json-ts dir/myfile.json

# run against multiple single JSON files (interfaces will be merged)
json-ts api/resp1.json api/resp2.json
```

## Usage (CLI)
Note: only stdin (which requires the --stdin flag) & filepaths are supported right now. 
Later I will add support for Windows, reading data from network requests etc.

```bash
## piping via stdin
curl https://jsonplaceholder.typicode.com/posts/1 | json-ts --stdin

## reading single json file from disk
json-ts my-file.json

## reading multiple json files from disk
json-ts my-file.json my-other-file.json
```

... produces the following: 

```ts
interface IRootObject {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

## Usage (API)

```bash
npm install json-ts --save-dev
```

```js
const { json2ts } = require('json-ts');
const json = `
{
    "name": "Shane"
}
`;
console.log(json2ts(json))
```

... produces the following:

```ts
interface IRootObject {
  name: string;
}
```

For more examples, see the [Tests](https://github.com/shakyShane/json-ts/tree/master/__tests__) 

## Options

 - **namespace: string** - if provided, interfaces will be wrapped in a namespace (see below)
    ```bash
    # usage
    json-ts <filename> --namespace <namespace_name> 
    
    # example
    json-ts data/my-file.json --namespace API
    ```
 - **flow: boolean** - output types in Flow format.
    ```bash
    # usage
    json-ts <filename> --flow 
    
    # example
    json-ts data/my-file.json --flow
    ```
 - **prefix: string** - override the `I` prefix on interface names
    ```bash
    # usage
    json-ts <filename> --prefix <prefix_string> 
    
    # example (remove prefix)
    json-ts data/my-file.json --prefix ""
    ```
 - **rootName: string** - override the `RootObject` name of the top-level interface
    ```bash
    # usage
    json-ts <filename> --rootName <rootname_string> 
    
    # example
    json-ts data/my-file.json --rootName "Product"
    ```

## TODO:

### options

- [x] Allow choice of `I` prefix on interface names
- [x] Allow naming of RootObject
- [ ] Allow choice of spaces/tabs

### Core
- [x] support array types
- [x] support boolean types
- [x] support null types
- [x] output types for Flow via `--flow`
- [x] PascalCase as default for all interface names
- [x] de-dupe interfaces (it's dumb atm, POC)
- [x] de-dupe interfaces where propname differs, but members are the same
- [x] merge interfaces by creating union types for members
- [x] union types for array that contain mixed literal types: `nums: [1, "2"] -> nums: number|string[]`
      (already works for complex objects)
- [x] quoted member names when needed
- [x] handle invalid name for interface
- [x] support type alias declarations
- [x] Use Typescript factory methods/printer for output 
- [x] Allow wrapping in namespace: eg:
    ```ts
        declare namespace Projects {
            export interface ILoc {
               lat: number;
               lng: number;
            }
            ...
        }
    ```
    
### CLI
- [x] CLI tool to accept stdin (with `--stdin` flag)
- [x] CLI tool to accept json file as input
- [ ] CLI tool to accept URL as input (for validating against remote API)
- [ ] configurable output (filename/stdout etc)
