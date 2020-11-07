import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, getJoin, getLogin, logout, postJoin, postLogin } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
// globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
// globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);

export default globalRouter;
