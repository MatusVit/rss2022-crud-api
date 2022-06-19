"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandle = void 0;
var errors_1 = require("../errors/errors");
var handleDeleteUsers_1 = require("./handleDeleteUsers");
var handleGetUsers_1 = require("./handleGetUsers");
var handlePostUsers_1 = require("./handlePostUsers");
var handlePutUsers_1 = require("./handlePutUsers");
var endpoints = (_a = {},
    _a["GET" /* HTTP_METHOD.GET */] = handleGetUsers_1.handleGetUsers,
    _a["POST" /* HTTP_METHOD.POST */] = handlePostUsers_1.handlePostUsers,
    _a["PUT" /* HTTP_METHOD.PUT */] = handlePutUsers_1.handlePutUsers,
    _a["DELETE" /* HTTP_METHOD.DELETE */] = handleDeleteUsers_1.handleDeleteUsers,
    _a);
var getHandle = function (method, urlArray, url) {
    if (method && urlArray[0] === 'api' && urlArray[1] === 'users' && endpoints[method]) {
        return endpoints[method];
    }
    throw new errors_1.HTTPError("Non-existing endpoint ".concat(method, " ").concat(url), 404);
};
exports.getHandle = getHandle;
