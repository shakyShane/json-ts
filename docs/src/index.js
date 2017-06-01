const fetch = require('unfetch').default;

const iniialJson = `{
    "author": "shakyShane",
    "profile": {
        "links": [
            {
              "name": "twitter",
              "url": "https://twitter.com/shaneOsbourne"
            },
            {
              "name": "Medium",
              "url": "https://medium.com/@shakyShane"
            }
        ]
    },
    "location": null,
    "email": null,
    "bio": null,
    "public_repos": 145,
    "public_gists": 69,
    "followers": 298,
    "following": 1,
    "created_at": "2012-04-14T17:34:37Z",
    "updated_at": "2017-04-26T12:43:35Z"
}`;
const $ = document.querySelector.bind(document);
const statusElem = $('.status');
const statusText = $('.debug');
const flow = $('#flow');
const rootName = $('#root-name');
const prefix = $('#prefix');
const namespace = $('#namespace');
const examplesElem = $('#examples');
const examples = [
    ['json/nested.json', 'Nested Objects & Arrays'],
    ['json/optional.json', 'Optional Fields'],
    ['json/recursive.json', 'Recursive data structures'],
    ['json/invalid-keys.json', 'Invalid property names']
];

examples.forEach(([json, title]) => {
    const opt = document.createElement('option');
    opt.value = json;
    opt.textContent = title;
    examplesElem.appendChild(opt);
});

examplesElem.addEventListener('change', function () {
    examplesElem.parentNode.classList.add('loading');
    const resp = fetch(examplesElem.value).then(x => x.text());
    resp.then(x => jsonInput.setValue(x));
});

let defaults = {
    flow: false,
    namespace: '',
    prefix: 'I',
    rootName: 'RootObject'
};

flow.addEventListener('change', function () {
    setOutput(jsonInput.getValue(), options({flow: flow.checked}));
});
namespace.addEventListener('input', function () {
    setOutput(jsonInput.getValue(), options({namespace: namespace.value}));
});
rootName.addEventListener('input', function () {
    setOutput(jsonInput.getValue(), options({rootName: rootName.value}));
});
rootName.addEventListener('input', function () {
    setOutput(jsonInput.getValue(), options({rootName: rootName.value}));
});
prefix.addEventListener('input', function () {
    setOutput(jsonInput.getValue(), options({prefix: prefix.value}));
});
const ts = json2ts(iniialJson, defaults);

var tsOutput = CodeMirror($('#ts'), {
    value: ts,
    mode: {name: "javascript", typescript: true}
});
var jsonInput = CodeMirror($('#app'), {
    value: iniialJson,
    mode: {name: "javascript", json: true}
});

function setOutput(json, options) {
    if (json && json.length > 3) {
        JSON.parse(json);
        const ts = json2ts(json, options);
        tsOutput.setValue(ts);
        status('success', 'JSON: All good!');
    }
}

jsonInput.on('change', function (obj) {
    try {
        setOutput(jsonInput.getValue());
    } catch (e) {
        status('error', `Error parsing JSON: ${e.message}`);
        console.log('Some JSON error?', e.message);
    }
});

function status(type, text) {
    statusElem.classList.remove('success');
    statusElem.classList.remove('error');
    statusElem.classList.add(type);
    statusText.textContent = text;
}
function options(incoming) {
    defaults = Object.assign({},
        defaults,
        incoming
    );
    return defaults;
}
