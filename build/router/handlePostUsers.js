"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostUsers = void 0;
const handlePostUsers = (req, res, userId, userDB) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
        try {
            if (req.headers['content-type'] === 'application/json') {
                const newUser = JSON.parse(data);
                if (typeof newUser.username === 'string' && typeof newUser.age === 'number' && Array.isArray(newUser.hobbies)) {
                    const user = userDB.add(newUser);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                    return;
                }
            }
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`User object doesn't contain required fields`);
        }
        catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`User object object is invalid`);
        }
    });
};
exports.handlePostUsers = handlePostUsers;
