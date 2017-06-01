/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var index = typeof fetch=='function' ? fetch : function(url, options) {
	options = options || {};
	return new Promise( function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.open(options.method || 'get', url);

		for (var i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.withCredentials = options.credentials=='include';

		request.onload = function () {
			resolve(response());
		};

		request.onerror = reject;

		request.send(options.body);

		function response() {
			var keys = [],
				all = [],
				headers = {},
				header;

			request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, function (m, key, value) {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				header = headers[key];
				headers[key] = header ? (header + "," + value) : value;
			});

			return {
				ok: (request.status/200|0) == 1,		// 200-399
				status: request.status,
				statusText: request.statusText,
				url: request.responseURL,
				clone: response,
				text: function () { return Promise.resolve(request.responseText); },
				json: function () { return Promise.resolve(request.responseText).then(JSON.parse); },
				xml: function () { return Promise.resolve(request.responseXML); },
				blob: function () { return Promise.resolve(new Blob([request.response])); },
				headers: {
					keys: function () { return keys; },
					entries: function () { return all; },
					get: function (n) { return headers[n.toLowerCase()]; },
					has: function (n) { return n.toLowerCase() in headers; }
				}
			};
		}
	});
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=unfetch.es.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const fetch = __webpack_require__(0).default;

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


/***/ })
/******/ ]);