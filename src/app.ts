import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to IT LOGIKO Server...!');
});

export default app;
