import * as express from 'express';
import {Express, Request, Response } from 'express-serve-static-core';

let admin: Express = express();
admin.get('/', (req: Request, res: Response, next: Function): any => {
    return res.send({ success: true, message: 'Admin Get Method', val: { name: 'getMethod' } });
});
admin.post('/test', (req: Request, res: Response, next: Function): any => {
    return res.send({ success: true, message: 'Admin Post Method', val: { name: 'postMethod' } });
});
export = admin;
