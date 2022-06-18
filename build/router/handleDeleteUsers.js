"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteUsers = void 0;
const uuid_1 = require("uuid");
const handleDeleteUsers = (req, res, userId, userDB) => {
    const correctUserId = userId.replaceAll('/', '');
    if (!correctUserId) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`${req.method} ${req.url} non-existing endpoint`);
        return;
    }
    if (!(0, uuid_1.validate)(correctUserId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(`UserId "${correctUserId}" is invalid. Not uuid.`);
        return;
    }
    const user = userDB.delete(correctUserId);
    if (user === null) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`User with id "${correctUserId}" doesn't exist.`);
        return;
    }
    res.statusCode = 204;
    res.end();
};
exports.handleDeleteUsers = handleDeleteUsers;
