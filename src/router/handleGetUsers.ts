import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handleGetUsers = (req: IncomingMessage, res: ServerResponse, userId: string, userDB: IMemoryDB): void => {
  if (!userId) {
    const users = userDB.getAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  if (!uuidValidate(userId)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`UserId "${userId}" is invalid. Not uuid.`);
    return;
  }

  const user = userDB.get(userId);

  if (user === null) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`User with id "${userId}" doesn't exist.`);
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};
