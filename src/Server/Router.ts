import {SessionConfig, CacheConfig} from '../Config';
import {GetRouter, Router, AuthMiddleware } from './Core';
import * as passport from 'passport';
import * as session from 'express-session';
import * as redisStore from 'connect-redis';
import Auth from './Modules/AppManager/Router/Auth';
import AppManager from './Modules/AppManager/Router';

let Store = redisStore(session);
SessionConfig.store = new Store(CacheConfig);

var route: Router = GetRouter();
route.use(session(SessionConfig));
route.use(passport.initialize());
route.use(passport.session());
route.use('/Auth', Auth);
route.use(AuthMiddleware);
route.use('/AppManager', AppManager);
export = route;
