import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes'

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Online on port ${PORT}`));

app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});
