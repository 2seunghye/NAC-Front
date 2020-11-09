import express from 'express';
import passport from 'passport';
import routes from '../routes';
import fs from 'fs';
import { home, getJoin, getLogin, logout, postJoin, postLogin, error } from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
// globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
// globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.error, error);

globalRouter.get('/imgs', function (req, res) {
  fs.readFile('error_img.jpg', function (error, data) {
    res.writeHead(200);
    res.end(data);
  });
});

export default globalRouter;
