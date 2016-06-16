import * as express from 'express';
import {Router, Request, Response, NextFunction } from 'express-serve-static-core';

let router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction): any => {
    req.isAuthenticated()
        ? next()
        : next(new Error('Authentication failed.'));
});

// router.use((req: Request, res: Response, next: NextFunction): any => {
//     let send = res.send;
//     res.send = (response): void => {
//         send({ Data: response });
//     };
//     next();
// });

export = router;
