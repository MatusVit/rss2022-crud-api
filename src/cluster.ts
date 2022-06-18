import cluster from 'cluster';
import { cpus } from 'os';
import { MemoryDB } from './DB/MemoryDatabase';
import { runServer } from './app';

const userDB = new MemoryDB();

if (cluster.isPrimary) {
  console.log(`Master start ${process.pid}`);

  const numCPUs = cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    // for (let i = 0; i < 2; i++) {
    // const worker = cluster.fork();
    // worker.send(userDB);
    cluster.fork();
  }

  // cluster.on('exit', (worker) => {
  //   console.log(`worker ${worker.process.pid} died`);
  //   const newWorker = cluster.fork();
  //   // newWorker.send(userDB);
  // });
} else {
  console.log(`Worker run  ${process.pid}`);

  // process.on('message', (userDB: MemoryDB) => {
  // console.log(`Worker run  ${process.pid} >>> userDB ${userDB}`);
  //   runServer(userDB);
  // });
  runServer(userDB);
}
