import { IUser } from 'types/entities';
import { IncomingMessage, ServerResponse } from 'http';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handlePostUsers = (req: IncomingMessage, res: ServerResponse, userId: string, userDB: IMemoryDB): void => {
  let data = '';
  req.on('data', (chunk) => (data += chunk));

  req.on('end', () => {
    try {
      if (req.headers['content-type'] === 'application/json') {
        const newUser = JSON.parse(data);

        if (typeof newUser.username === 'string' && typeof newUser.age === 'number' && Array.isArray(newUser.hobbies)) {
          const user = userDB.add(newUser);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
          return;
        }
      }
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(`User object doesn't contain required fields`);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(`User object object is invalid`);
    }
  });
};
