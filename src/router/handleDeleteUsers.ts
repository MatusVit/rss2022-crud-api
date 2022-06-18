import { IUser } from 'types/entities';
import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handleDeleteUsers = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  userDB: IMemoryDB
): void => {
  const correctUserId = userId.replaceAll('/', '');

  if (!correctUserId) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`${req.method} ${req.url} non-existing endpoint`);
    return;
  }

  if (!uuidValidate(correctUserId)) {
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
