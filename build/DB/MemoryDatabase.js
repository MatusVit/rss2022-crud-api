"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDB = void 0;
var uuid_1 = require("uuid");
var MemoryDB = /** @class */ (function () {
    function MemoryDB() {
        var _this = this;
        this.getAll = function () {
            return Object.values(_this._usersStore);
        };
        this.get = function (userId) {
            var user = _this._usersStore[userId];
            if (user)
                return user;
            return null;
        };
        this.add = function (user) {
            var userId = (0, uuid_1.v4)();
            _this._usersStore[userId] = __assign(__assign({}, user), { id: userId });
            return _this._usersStore[userId];
        };
        this.update = function (userId, user) {
            var updatingUser = _this._usersStore[userId];
            if (!updatingUser)
                return null;
            _this._usersStore[userId] = __assign(__assign(__assign({}, updatingUser), user), { id: userId });
            return _this._usersStore[userId];
        };
        this.delete = function (userId) {
            // throw new Error('Oops!!!');
            var user = _this._usersStore[userId];
            if (user) {
                return delete _this._usersStore[userId] ? user : null;
            }
            return null;
        };
        this._usersStore = {};
    }
    return MemoryDB;
}());
exports.MemoryDB = MemoryDB;
