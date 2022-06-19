import cluster from 'cluster';
import { cpus } from 'os';
import { MemoryDB } from './DB/MemoryDatabase';
import { runServer } from './app';

if (cluster.isPrimary) {
  console.log(`Master start ${process.pid}`);

  const numCPUs = cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker run  ${process.pid}`);
  const userDB = new MemoryDB();
  runServer(userDB);
}
