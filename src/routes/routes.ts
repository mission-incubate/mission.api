import * as express from 'express';
import {Express } from 'express-serve-static-core';
import * as admin from './admin';
import * as user from './admin/user';

var route: Express = express();
route.use('/admin', admin);
route.use('/user', user);
export = route;
