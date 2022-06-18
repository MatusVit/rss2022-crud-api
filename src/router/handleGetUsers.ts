import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handleGetUsers = (req: IncomingMessage, res: ServerResponse, userId: string, userDB: IMemoryDB): void => {
  const correctUserId = userId.replaceAll('/', '');

  if (!correctUserId) {
    const users = userDB.getAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  if (!uuidValidate(correctUserId)) {
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
