"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetUsers = void 0;
const uuid_1 = require("uuid");
const handleGetUsers = (req, res, userId, userDB) => {
    const correctUserId = userId.replaceAll('/', '');
    if (!correctUserId) {
        const users = userDB.getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        return;
    }
    if (!(0, uuid_1.validate)(correctUserId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(`UserId "${correctUserId}" is invalid. Not uuid.`);
        return;
    }
    const user = userDB.get(correctUserId);
    if (user === null) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`User with id "${correctUserId}" doesn't exist.`);
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
};
exports.handleGetUsers = handleGetUsers;
