"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandle = void 0;
const handleDeleteUsers_1 = require("./handleDeleteUsers");
const handleGetUsers_1 = require("./handleGetUsers");
const handlePostUsers_1 = require("./handlePostUsers");
const handlePutUsers_1 = require("./handlePutUsers");
const endpoints = {
    ["GET" /* HTTP_METHOD.GET */]: handleGetUsers_1.handleGetUsers,
    ["POST" /* HTTP_METHOD.POST */]: handlePostUsers_1.handlePostUsers,
    ["PUT" /* HTTP_METHOD.PUT */]: handlePutUsers_1.handlePutUsers,
    ["DELETE" /* HTTP_METHOD.DELETE */]: handleDeleteUsers_1.handleDeleteUsers,
};
const getHandle = (method) => {
    if (endpoints[method]) {
        return endpoints[method];
    }
    return null;
};
exports.getHandle = getHandle;
