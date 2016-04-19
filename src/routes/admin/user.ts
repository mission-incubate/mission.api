import * as express from 'express';
import {Router, Request, Response } from 'express-serve-static-core';
//import {BOFactory, UserBO} from '../../bo/UserBO';
import {ServiceFactory, UserService} from '../../service/UserService';

let router: Router = express.Router();


router.post('/', (req: Request, res: Response, next: Function): any => {
    let service = ServiceFactory.CreateService(UserService);
    service.GetAllUsersAsync(req.body).then((response) => {
        return res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send({
            Data: null,
            PageContext: null,
            Error: { Code: err.code, Message: process.env.NODE_ENV === 'development' ? err.message : '' }
        });
    });
    // let bo = BOFactory.CreateBO(UserBO);
    // bo.GetAllUsersAsync()
    //     .then((users) => {
    //         bo.GetAllUsersAsync()
    //             .then((users2) => {
    //                 return res.send({ success: true, message: 'Admin Get Async Method', val: [users, users2] });
    //             });
    //         //return res.send({ success: true, message: 'Admin Get Async Method', val: users });
    //     });
});

export = router;
