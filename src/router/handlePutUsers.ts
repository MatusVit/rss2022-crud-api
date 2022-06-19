import { IUser } from 'types/entities';
import { getRequestData, checkUserObject } from './../utils/common';
import { HTTPError } from './../errors/errors';
import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handlePutUsers = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  userDB: IMemoryDB
): Promise<void> => {
  const correctUserId = userId as string;

  try {
    if (!uuidValidate(correctUserId)) throw new HTTPError(`UserId ${correctUserId} is invalid. Not uuid.`, 400);

    const user = userDB.get(correctUserId);
    if (user === null) throw new HTTPError(`User with id ${correctUserId} doesn't exist.`, 404);

    const userObject = await getRequestData(req);

    const isCorrectUser = checkUserObject(userObject);

    if (!isCorrectUser) {
      throw new HTTPError(`User object doesn't contain required fields or incorrect field`, 400);
    }

    const newUser = userDB.update(correctUserId, userObject as IUser);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new HTTPError('User object is invalid', 400);
    } else {
      throw error;
    }
  }
};
