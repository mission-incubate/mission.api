import {SessionOptions } from './BaseConfig';
import {AppConfig} from './AppConfig';

export const SessionConfig: SessionOptions = {
    secret: 'SecretKey',
    cookie: { secure: AppConfig.IsHttpsEnabled, maxAge: 600000 },
    resave: false,
    saveUninitialized: true
};
