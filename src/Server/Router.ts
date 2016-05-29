import {GetRouter, Router, AuthMiddleware } from './Core';
import {UserRoute} from './Modules/Registration';
// import * as admin from './admin';

var route: Router = GetRouter();
route.use(AuthMiddleware);
// route.use('/admin', admin);
route.use('/user', UserRoute);
export = route;
