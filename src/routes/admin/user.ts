import * as express from 'express';
import {Router, Request, Response, NextFunction } from 'express-serve-static-core';
import {ServiceFactory, UserService} from '../../service';

let router: Router = express.Router();

router.post('/FindById', (req: Request, res: Response, next: NextFunction): any => {
    let service = ServiceFactory.CreateService(UserService);
    service.FindById(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

router.post('/GetAllUsers', (req: Request, res: Response, next: NextFunction): any => {
    let service = ServiceFactory.CreateService(UserService);
    service.GetAllUsers(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

router.post('/AddUser', (req: Request, res: Response, next: NextFunction): any => {
    let service = ServiceFactory.CreateService(UserService);
    service.AddUser(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

export = router;
