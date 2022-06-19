"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.HTTPError = void 0;
var HTTPError = /** @class */ (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.name = 'HTTPError';
        _this.statusCode = code;
        return _this;
    }
    return HTTPError;
}(Error));
exports.HTTPError = HTTPError;
var handleErrors = function (error, response) {
    if (error instanceof HTTPError) {
        response.writeHead(error.statusCode, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: error.message }));
        return;
    }
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end("Internal Server Error");
};
exports.handleErrors = handleErrors;
