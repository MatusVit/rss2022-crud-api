import { HTTPError } from './../errors/errors';
import { checkUserObject, getRequestData } from './../utils/common';
import { IUser } from 'types/entities';
import { IncomingMessage, ServerResponse } from 'http';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handlePostUsers = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  userDB: IMemoryDB
): Promise<void> => {
  try {
    const userObject = await getRequestData(req);

    const isCorrectUser = checkUserObject(userObject);
    if (!isCorrectUser) {
      throw new HTTPError(`User object doesn't contain required fields or incorrect field`, 400);
    }

    const user = userDB.add(userObject as IUser);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new HTTPError('User object is invalid', 400);
    } else {
      throw error;
    }
  }
};
