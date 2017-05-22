[![Build Status](https://travis-ci.org/shakyShane/json-ts.svg?branch=master)](https://travis-ci.org/shakyShane/json-ts)

## json-ts

> Automatically generate Typescript Definition files based on JSON input. This allows
 a frontend to verify it's using a backend correctly & optionally tie it into a CI environment.
 
![json-ts](https://cdn.rawgit.com/shakyShane/json-ts/37ce9b2b/json-ts2.gif)
 
## Quick-start
```bash
# install
npm install -g json-ts

# run against JSON file
json-ts dir/myfile.json
```

## Usage (CLI)
Note: only stdin (which requires the --stdin flag) & filepaths are supported right now. 
Later I will add support for Windows, reading data from network requests etc.

```bash
## piping via stdin
curl https://jsonplaceholder.typicode.com/posts/1 | json-ts --stdin

## reading json from disk
json-ts my-file.json
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

## TODO:

### options

- [x] Allow choice of `I` prefix on interface names
- [ ] Allow naming of RootObject
- [ ] Allow choice of spaces/tabs

### Core
- [x] support array types
- [x] support boolean types
- [x] support null types
- [ ] output types for Flow via `--flow`
- [x] PascalCase as default for all interface names
- [x] de-dupe interfaces (it's dumb atm, POC)
- [x] de-dupe interfaces where propname differs, but members are the same
- [x] merge interfaces by creating union types for members
- [ ] union types for array that contain mixed literal types: `nums: [1, "2"] -> nums: number|string[]`
      (already works for complex objects)
- [x] quoted member names when needed
- [ ] handle invalid name for interface
- [ ] Use Typescript factory methods/printer for output 
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
