> TS implementation of json2ts

Automatically generate Typescript Definition files based on JSON input. This allows
 a frontend to verify it's using a backend correctly & optionally tie it into a CI environment.

## Example 

Given the following `JSON` (that could be on disk, or retrieved via a HTTP request)

```json
{
  "date": "01/02/03",
  "summary": {
    "url": "http://example.com", 
    "path": "/where",
    "loc": {
        "lat": 10, 
        "lng": 11
    }
  }
}
```

... this tool will produce the following `Typescript definitions` 

```ts
interface IRootObject {
  date: string;
  summary: ISummary;
}

interface ISummary {
  url: string;
  path: string;
  loc: ILoc;
}

interface ILoc {
  lat: number;
  lng: number;
}
```

## TODO:

### options

- [ ] Allow choice of `I` prefix on interface names
- [ ] Allow naming of RootObject
- [ ] Allow choice of spaces/tabs

### Core
- [x] support array types
- [x] support boolean types
- [x] support null types
- [x] PascalCase as default for all interface names
- [x] de-dupe interfaces (it's dumb atm, POC)
- [ ] union types for array that contain mixed types: `nums: [1, "2"] -> nums: number|string[]` 
- [ ] handle none-valid names - where it's valid in JSON (cuz it's a string) - but not a valid identifier in 
      output TS file
- [ ] Allow wrapping in namespace: eg: 
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
- [ ] CLI tool to accept json file as input
- [ ] CLI tool to accept URL as input (for validating against remote API)
- [ ] configurable output (filename/stdout etc)