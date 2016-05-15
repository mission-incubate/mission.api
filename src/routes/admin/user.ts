import * as express from 'express';
import {Router, Request, Response, NextFunction } from 'express-serve-static-core';
import {ServiceFactory, UserService} from '../../service';

let router: Router = express.Router();
const service = ServiceFactory.CreateService(UserService);

router.post('/FindById', (req: Request, res: Response, next: NextFunction): any => {
    service.FindById(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

router.post('/GetAllUsers', (req: Request, res: Response, next: NextFunction): any => {
    service.GetAllUsers(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

router.post('/AddUser', (req: Request, res: Response, next: NextFunction): any => {
    service.AddUser(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

export = router;
