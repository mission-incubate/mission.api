import * as express from 'express';
import {Router, Request, Response, NextFunction } from 'express-serve-static-core';
import {ServiceFactory} from '../../service';
import {UserService} from '../../service/UserService';

let router: Router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction): any => {
    let service = ServiceFactory.CreateService(UserService);
    service.GetAllUsersAsync(req.body).then((response) => {
        res.send(response);
    }).catch(next);
});

export = router;
