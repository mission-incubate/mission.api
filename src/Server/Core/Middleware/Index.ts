import * as express from 'express';
import {Router, Request, Response, NextFunction } from 'express-serve-static-core';

let router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction): any => {
    //TODO: Authentication implementation.
    console.log('Authenticated successfully.');
    next();
    // if (true) { // if authentication failed.
    //     next(new Error('Authentication failed.'));
    // }
});

export = router;
