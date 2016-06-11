import {ServiceFactory} from '../../Base/Service';
import {Router, Request, Response, NextFunction, GetRouter } from '../../../Core';
import {UserService} from '../Service';

let router: Router = GetRouter();

router.post('/FindById', (req: Request, res: Response, next: NextFunction): any => {
    const service = ServiceFactory.CreateService(UserService, req.body);
    service.FindById(req.body)
        .then((response) => { res.send(response); })
        .catch(next);
});

router.post('/GetAllUsers', (req: Request, res: Response, next: NextFunction): any => {
    const service = ServiceFactory.CreateService(UserService, req.body);
    service.GetAllUsers(req.body)
        .then((response) => { res.send(response); })
        .catch(next);
});

router.post('/AddUser', (req: Request, res: Response, next: NextFunction): any => {
    const service = ServiceFactory.CreateService(UserService, req.body);
    service.AddUser(req.body)
        .then((response) => { res.send(response); })
        .catch(next);
});

export default router;
