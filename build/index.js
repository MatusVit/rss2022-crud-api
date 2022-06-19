"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
var MemoryDatabase_1 = require("./DB/MemoryDatabase");
var app_1 = require("./app");
var userDB = new MemoryDatabase_1.MemoryDB();
exports.startApp = (function () {
    (0, app_1.runServer)(userDB);
})();
