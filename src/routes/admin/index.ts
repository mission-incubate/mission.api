import * as express from 'express';
import {Express, Request, Response } from 'express-serve-static-core';
import { Dal } from '../../dal/index';
import { DB} from '../../appsettings';
import { User} from '../../model/user';
import { BOFactory, UserBO} from '../../bo/UserBO';

let admin: Express = express();
admin.get('/', (req: Request, res: Response, next: Function): any => {
    var dal = new Dal(DB, false);
    dal.Connect().then(() => {
        //dal.Begin().then(() => {
        dal.ExecuteQuery<User>('select top 5 Id , Name, City  from [users] ').then((users) => {
            //dal.Commit().then(() => {
            return res.send({ success: true, message: 'Admin Get Method', val: users });
        });
        //     });
        // });
    });
    //return res.send({ success: true, message: 'Admin Get Method', val: { name: 'getMethod' } });
});

admin.get('/get', (req: Request, res: Response, next: Function): any => {
    let out = BOFactory.CreateBO(UserBO);
    return out;
});

admin.post('/test', (req: Request, res: Response, next: Function): any => {
    return res.send({ success: true, message: 'Admin Post Method', val: { name: 'postMethod' } });
});
export = admin;
