import * as express from 'express';
import {ServiceFactory} from '../../Base';
import {Router, Request, Response, NextFunction } from '../../../Core';
import {UserService} from '../Service';

let router: Router = express.Router();

router.post('/FindById', (req: Request, res: Response, next: NextFunction): any => {
    const service = ServiceFactory.CreateService(UserService, req.body);
    service.FindById(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

router.post('/GetAllUsers', (req: Request, res: Response, next: NextFunction): any => {
    const service = ServiceFactory.CreateService(UserService, req.body);
    service.GetAllUsers(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

router.post('/AddUser', (req: Request, res: Response, next: NextFunction): any => {
    const service = ServiceFactory.CreateService(UserService, req.body);
    service.AddUser(req.body)
        .then((response) => {
            res.send(response);
        }).catch(next);
});

export default router;
