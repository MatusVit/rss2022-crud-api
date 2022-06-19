import http, { IncomingMessage, ServerResponse } from 'http';
import { handleErrors } from './errors/errors';
import { getHandle } from './router/endpoints';
import { MemoryDB } from './DB/MemoryDatabase';
import { UserId } from './types/entities';

const PORT = process.env.PORT || 5000;

export const runServer = (userDB: MemoryDB) => {
  http
    .createServer((request: IncomingMessage, response: ServerResponse) => {
      const { url, method } = request;

      try {
        const urlArray = (url as string).split('/').filter((item) => item);
        const handle = getHandle(method, urlArray, url);
        const userId: UserId = urlArray[2];

        handle(request, response, userId, userDB).catch((error: unknown) => handleErrors(error as Error, response));
      } catch (error) {
        handleErrors(error as Error, response);
      }
    })
    .listen(PORT, () => {
      console.log(`Server started on PORT ${PORT} http://localhost:${PORT}/`);
    })
    .on('error', (error) => {
      console.log('Error http server', error);
    });
};
