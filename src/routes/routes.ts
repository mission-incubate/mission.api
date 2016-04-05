import * as express from 'express';
import * as admin from './admin';

var route :express.Express = express();
route.use('/admin', admin);
export = route;
