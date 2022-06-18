import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handlePutUsers = (req: IncomingMessage, res: ServerResponse, userId: string, userDB: IMemoryDB): void => {
  const correctUserId = userId.replaceAll('/', '');

  if (!uuidValidate(correctUserId)) {
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
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User object object is invalid`);
    }
  });
};
