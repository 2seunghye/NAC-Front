import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { localsMiddleware } from './middlewares';
import routes from './routes';
import globalRouter from './routers/globalRouter';

const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);

export default app;
