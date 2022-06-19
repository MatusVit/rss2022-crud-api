"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
var http_1 = __importDefault(require("http"));
var errors_1 = require("./errors/errors");
var endpoints_1 = require("./handlers/endpoints");
var PORT = process.env.PORT || 5000;
var runServer = function (userDB) {
    http_1.default
        .createServer(function (request, response) {
        var url = request.url, method = request.method;
        try {
            var urlArray = url.split('/').filter(function (item) { return item; });
            var handle = (0, endpoints_1.getHandle)(method, urlArray, url);
            var userId = urlArray[2];
            handle(request, response, userId, userDB).catch(function (error) { return (0, errors_1.handleErrors)(error, response); });
        }
        catch (error) {
            (0, errors_1.handleErrors)(error, response);
        }
    })
        .listen(PORT, function () {
        console.log("Server started on PORT ".concat(PORT, " http://localhost:").concat(PORT, "/"));
    })
        .on('error', function (error) {
        console.log('Error http server', error);
    });
};
exports.runServer = runServer;
