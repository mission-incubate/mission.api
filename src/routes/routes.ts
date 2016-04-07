import * as express from 'express';
import {Express } from 'express-serve-static-core';
import * as admin from './admin';

var route: Express = express();
route.use('/admin', admin);
export = route;
