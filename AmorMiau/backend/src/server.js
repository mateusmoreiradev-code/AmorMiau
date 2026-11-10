import { createServer } from 'node:http';

const port = Number(process.env.API_PORT ?? 3001);

const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.writeHead(204).end();
    return;
  }

  if (request.method === 'GET' && request.url === '/api/health') {
    response.writeHead(200).end(JSON.stringify({ status: 'ok', service: 'amormiau-api' }));
    return;
  }

  response.writeHead(404).end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(port, () => {
  console.log(`API AmorMiau disponível em http://localhost:${port}`);
});
