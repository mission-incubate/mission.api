import * as express from 'express';
import {Router, Request, Response } from 'express-serve-static-core';
import {BOFactory, UserBO} from '../../bo/UserBO';

let router: Router = express.Router();


router.get('/', (req: Request, res: Response, next: Function): any => {
    try {
        let bo = BOFactory.CreateBO(UserBO);
        bo.GetAllUsersAsync()
            .then((users) => {
                bo.GetAllUsersAsync()
                    .then((users2) => {
                        return res.send({ success: true, message: 'Admin Get Async Method', val: [users, users2] });
                    });
                //return res.send({ success: true, message: 'Admin Get Async Method', val: users });
            });
    } catch (ex) {
        console.log(ex);
    }
});

export = router;
