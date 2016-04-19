import * as express from 'express';
import {Router, Request, Response, NextFunction } from 'express-serve-static-core';
//import {BOFactory, UserBO} from '../../bo/UserBO';
import {ServiceFactory, UserService} from '../../service/UserService';

let router: Router = express.Router();


router.post('/', (req: Request, res: Response, next: NextFunction): any => {
    let service = ServiceFactory.CreateService(UserService);
    service.GetAllUsersAsync(req.body).then((response) => {
        res.send(response);
    }).catch(next);
    // .catch((err) => {
    //     console.log(err);
    //     res.send({
    //         Data: null,
    //         PageContext: null,
    //         Error: { Code: err.code, Message: process.env.NODE_ENV === 'development' ? err.message : '' }
    //     });
    // });
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
