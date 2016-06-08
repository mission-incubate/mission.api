import {SessionOptions } from './BaseConfig';

export const SessionConfig: SessionOptions = {
    secret: 'SecretKey',
    cookie: { secure: true, maxAge: 60000 },
    resave: false,
    saveUninitialized: true
};
