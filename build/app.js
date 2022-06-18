"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("./router/endpoints");
const MemoryDatabase_1 = require("./DB/MemoryDatabase");
const http_1 = __importDefault(require("http"));
const USERS_URL = '/api/users';
const PORT = process.env.PORT || 5000;
const userDB = new MemoryDatabase_1.MemoryDB();
const server = http_1.default.createServer((request, response) => {
    const { url, method } = request;
    let isValidUrl = false;
    try {
        if (url && method && url.startsWith(USERS_URL)) {
            const handle = (0, endpoints_1.getHandle)(method);
            if (handle !== null) {
                const userId = url.slice(USERS_URL.length);
                handle(request, response, userId, userDB);
                isValidUrl = true;
            }
        }
        if (!isValidUrl) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end(`Request ${method} ${url} doesn't exists`);
        }
    }
    catch (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(`Internal Server Error`);
    }
});
server
    .listen(PORT, () => {
    console.log(`Server started on PORT ${PORT} http://localhost:${PORT}/`);
})
    .on('error', (error) => {
    console.log('Error', error);
});
