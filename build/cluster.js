"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cluster_1 = __importDefault(require("cluster"));
var os_1 = require("os");
var MemoryDatabase_1 = require("./DB/MemoryDatabase");
var app_1 = require("./app");
if (cluster_1.default.isPrimary) {
    console.log("Master start ".concat(process.pid));
    var numCPUs = (0, os_1.cpus)().length;
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker) {
        console.log("worker ".concat(worker.process.pid, " died"));
        cluster_1.default.fork();
    });
}
else {
    console.log("Worker run  ".concat(process.pid));
    var userDB = new MemoryDatabase_1.MemoryDB();
    (0, app_1.runServer)(userDB);
}
