import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handlePutUsers = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  userDB: IMemoryDB
): void => {};
