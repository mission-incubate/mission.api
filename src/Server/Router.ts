import {SessionConfig} from '../Config';
import {GetRouter, Router, AuthMiddleware } from './Core';
import registration from './Modules/Registration/Router';
// import * as admin from './admin';
import * as passport from 'passport';
import * as session from 'express-session';
//import * as redisStore from 'connect-redis';
import Auth from './Modules/Registration/Router/Auth';

// let Store = redisStore(session);
// SessionConfig.store = Store;

var route: Router = GetRouter();
route.use(session(SessionConfig));
route.use(passport.initialize());
route.use(passport.session());
route.use('/auth', Auth);
route.use(AuthMiddleware);
// route.use('/admin', admin);
route.use('/registration', registration);
export = route;
