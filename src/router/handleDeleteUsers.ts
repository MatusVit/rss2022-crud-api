import { HTTPError } from './../errors/errors';
import { IUser } from 'types/entities';
import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handleDeleteUsers = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  userDB: IMemoryDB
): Promise<void> => {
  const correctUserId = userId as string;

  if (!uuidValidate(correctUserId)) throw new HTTPError(`UserId ${correctUserId} is invalid. Not uuid.`, 400);

  const user = userDB.get(correctUserId);
  if (user === null) throw new HTTPError(`User with id ${correctUserId} doesn't exist.`, 404);

  userDB.delete(correctUserId);

  res.statusCode = 204;
  res.end();
};
