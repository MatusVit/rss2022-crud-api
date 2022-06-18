"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePutUsers = void 0;
const uuid_1 = require("uuid");
const handlePutUsers = (req, res, userId, userDB) => {
    const correctUserId = userId.replaceAll('/', '');
    if (!(0, uuid_1.validate)(correctUserId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(`UserId "${correctUserId}" is invalid. Not uuid.`);
        return;
    }
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
        try {
            if (req.headers['content-type'] === 'application/json') {
                const newUser = JSON.parse(data);
                // todo *** check user fields are valid in newUser
                const user = userDB.update(correctUserId, newUser);
                if (user === null) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end(`User with id "${correctUserId}" doesn't exist.`);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
                return;
            }
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`User object contain incorrect field`);
        }
        catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`User object object is invalid`);
        }
    });
};
exports.handlePutUsers = handlePutUsers;
