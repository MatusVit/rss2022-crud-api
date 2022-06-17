import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/users') {
    return res.end('USERS !!!');
  }

  if (req.url === '/post') {
    return res.end('POST !!!');
  }
});

server
  .listen(PORT, () => {
    console.log(`Server started on PORT ${PORT} http://localhost:${PORT}/`);
  })
  .on('error', (error) => {
    console.log('Error', error);
  });
