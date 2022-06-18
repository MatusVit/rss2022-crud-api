import { getHandle } from './router/endpoints';
import { MemoryDB } from './DB/MemoryDatabase';
import http, { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { HTTP_METHOD } from 'types/entities';

const USERS_URL = '/api/users';

const PORT = process.env.PORT || 5000;

const userDB = new MemoryDB();

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  const { url, method } = request;

  let isValidUrl = false;

  try {
    if (url && method && url.startsWith(USERS_URL)) {
      const handle = getHandle(method);

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
  } catch (error) {
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
