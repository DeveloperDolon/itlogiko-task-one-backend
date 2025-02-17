import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { ApplicationRouter } from './app/modules/application/application.router';
import { UserRoute } from './app/modules/user/user.router';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/api', UserRoute);
app.use('/api', ApplicationRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to IT LOGIKO Server...!');
});

app.use('*', (req: Request, res: Response) => {
  res.send({ success: false, message: 'Route is not defined.' });
});

export default app;
