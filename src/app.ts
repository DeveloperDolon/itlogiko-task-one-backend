import { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to IT LOGIKO Server...!');
});

app.use('*', (req: Request, res: Response) => {
  res.send({ success: false, message: 'Route is not defined.' });
});

export default app;
