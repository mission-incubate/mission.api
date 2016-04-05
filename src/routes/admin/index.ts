import * as express from 'express';

let admin = express();
admin.get('/', (req: express.Request, res: express.Response, next: Function): any => {
    return res.send({ success: true, message: 'Admin Get Method', val: {name : 'getMethod'} });
});
admin.post('/', (req: express.Request, res: express.Response, next: Function): any => {
    return res.send({ success: true, message: 'Admin Post Method', val: {name : 'postMethod'} });
});
export = admin;
