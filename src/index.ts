import { MemoryDB } from './DB/MemoryDatabase';
import { runServer } from './app';

const userDB = new MemoryDB();

export const startApp = (function () {
  runServer(userDB);
})();
