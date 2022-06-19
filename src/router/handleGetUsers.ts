import { HTTPError } from './../errors/errors';
import { UserId } from 'types/entities';
import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handleGetUsers = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: UserId,
  userDB: IMemoryDB
): Promise<unknown> => {
  if (!userId) {
    const users = userDB.getAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  const correctUserId = userId as string;

  if (!uuidValidate(correctUserId)) throw new HTTPError(`UserId ${correctUserId} is invalid. Not uuid.`, 400);

  const user = userDB.get(correctUserId);

  if (user === null) throw new HTTPError(`User with id ${correctUserId} doesn't exist.`, 404);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};
