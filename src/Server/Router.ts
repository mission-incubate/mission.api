import {GetRouter, Router, AuthMiddleware } from './Core';
import registration from './Modules/Registration/Router';
// import * as admin from './admin';

var route: Router = GetRouter();
route.use(AuthMiddleware);
// route.use('/admin', admin);
route.use('/registration', registration);
export = route;
