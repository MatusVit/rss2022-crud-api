"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDB = void 0;
const uuid_1 = require("uuid");
class MemoryDB {
    constructor() {
        this.getAll = () => {
            return Object.values(this._usersStore);
        };
        this.get = (userId) => {
            const user = this._usersStore[userId];
            if (user)
                return user;
            return null;
        };
        this.add = (user) => {
            const userId = (0, uuid_1.v4)();
            this._usersStore[userId] = { ...user, id: userId };
            return this._usersStore[userId];
        };
        this.update = (userId, user) => {
            const updatingUser = this._usersStore[userId];
            if (!updatingUser)
                return null;
            this._usersStore[userId] = { ...updatingUser, ...user, id: userId };
            return this._usersStore[userId];
        };
        this.delete = (userId) => {
            // throw new Error('Oops!!!');
            const user = this._usersStore[userId];
            if (user) {
                return delete this._usersStore[userId] ? user : null;
            }
            return null;
        };
        this._usersStore = {};
    }
}
exports.MemoryDB = MemoryDB;
