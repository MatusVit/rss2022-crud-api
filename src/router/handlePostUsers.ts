import { IUser } from 'types/entities';
import { IncomingMessage, ServerResponse } from 'http';

import { IMemoryDB } from 'DB/MemoryDatabase';

export const handlePostUsers = (req: IncomingMessage, res: ServerResponse, userId: string, userDB: IMemoryDB): void => {
  let data = '';
  req.on('data', (chunk) => (data += chunk));

  req.on('end', () => {
    try {
      const newUser: IUser = JSON.parse(data);

      if (typeof newUser.username === 'string' && typeof newUser.age === 'number' && Array.isArray(newUser.hobbies)) {
        const user = userDB.add(newUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User object doesn't contain required fields`);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`User object object is invalid`);
    }
  });
};
