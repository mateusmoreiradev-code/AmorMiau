import 'dotenv/config';
import express from 'express';
import { errorHandler } from './lib/http.js';
import { UPLOAD_DIR } from './lib/upload.js';
import { prisma } from './lib/prisma.js';
import authRoutes from './routes/auth.js';
import animaisRoutes from './routes/animais.js';
import eventosRoutes from './routes/eventos.js';
import doacoesRoutes from './routes/doacoes.js';
import petSittersRoutes from './routes/petsitters.js';
import paginasRoutes from './routes/paginas.js';
import uploadsRoutes from './routes/uploads.js';

const port = Number(process.env.API_PORT ?? 3001);
const app = express();

app.disable('x-powered-by');
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }
  next();
});
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'amormiau-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/animais', animaisRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/doacoes', doacoesRoutes);
app.use('/api/petsitters', petSittersRoutes);
app.use('/api/paginas', paginasRoutes);
app.use('/api/uploads', uploadsRoutes);

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'Rota não encontrada' });
});
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`API AmorMiau disponível em http://localhost:${port}`);
});

async function encerrar() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on('SIGINT', encerrar);
process.on('SIGTERM', encerrar);
