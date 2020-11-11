(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Discord", [], factory);
	else if(typeof exports === 'object')
		exports["Discord"] = factory();
	else
		root["Discord"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 108:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var Discord = /** @class */ (function () {
    function Discord(ws) {
        this.ws = ws;
    }
    Discord.prototype.request = function (type, data) {
        var requestData = data;
        requestData.type = type;
        this.ws.send(JSON.stringify(requestData));
    };
    Discord.connect = function () {
        return new Discord(new WebSocket(Discord.serverURL));
    };
    Discord.prototype.onMessage = function (onMessageCallback) {
        this.ws.onmessage = function (event) {
            var msgObject = JSON.parse(event.data);
            onMessageCallback(msgObject);
        };
    };
    Object.defineProperty(Discord.prototype, "onReady", {
        set: function (onReadyCallback) {
            this.ws.onopen = onReadyCallback;
        },
        enumerable: false,
        configurable: true
    });
    Discord.serverURL = 'ws://lotix.kro.kr:7010';
    return Discord;
}());
exports.default = Discord;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(108);
/******/ })()
.default;
});