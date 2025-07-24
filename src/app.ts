import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import notFound from './app/utils/notFound';
import globalErrorHandler from './app/utils/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send({
    Message: 'Welcome to AI Summarization Server',
    email: 'robayatfarsit@gmail.com',
  });
});

app.use('/api', router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
