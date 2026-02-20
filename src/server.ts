import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes';
import { AppError } from './errors/AppError';

// Validação de variáveis obrigatórias ao iniciar
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 16) {
  console.error('Erro: JWT_SECRET não configurado');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));

app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

app.use(router);

// Middleware de tratamento de erros (400/401/403/404/500)
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : 'Internal server error.';

  if (statusCode >= 500) {
    console.error('Erro:', err.message);
  } else {
    console.error('Erro (cliente):', err.message);
  }

  return res.status(statusCode).json(
    statusCode === 500 ? { error: 'Internal server error.' } : { error: message }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Online on port ${PORT}`));
