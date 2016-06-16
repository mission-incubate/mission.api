import {SessionOptions } from './BaseConfig';
import {WebServerConfig} from './WebServerConfig';

export const SessionConfig: SessionOptions = {
    secret: 'SecretKey',
    cookie: { secure: WebServerConfig.IsHttpsEnabled, maxAge: 1000 * 60 * 10, httpOnly: true },
    resave: false,
    saveUninitialized: true
};
