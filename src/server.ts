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

app.use(router);

// Adicione logs específicos para verificar os dados recebidos em rotas importantes
app.post('/users', (req, res, next) => {
  console.log('Dados recebidos no cadastro:', req.body);
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server Online on port ${PORT}`));
