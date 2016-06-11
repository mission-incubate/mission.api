import {SessionOptions } from './BaseConfig';
import {AppConfig} from './AppConfig';

export const SessionConfig: SessionOptions = {
    secret: 'SecretKey',
    cookie: { secure: AppConfig.IsHttpsEnabled, maxAge: 1000 * 60 * 10, httpOnly: true },
    resave: false,
    saveUninitialized: true
};
