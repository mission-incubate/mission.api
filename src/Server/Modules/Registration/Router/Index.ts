import {GetRouter, Router } from '../../../Core';
import User from './User';

let router: Router = GetRouter();
router.use('/user', User);
export default router;
