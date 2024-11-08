import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' })); // Permitir todas as origens (modifique conforme necessário)

app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

app.use(router); // Certifique-se de que o router está sendo usado aqui

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err.message);
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server errorr.',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server Online on port ${PORT}`));
