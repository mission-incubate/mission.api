import {GetRouter, Router } from '../Core';
// import * as admin from './admin';
import * as user from './admin/user';

var route: Router = GetRouter();
// route.use('/admin', admin);
route.use('/user', user);
export = route;
