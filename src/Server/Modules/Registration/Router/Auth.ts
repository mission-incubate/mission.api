import {BoFactory} from '../../Base/Business';
import {Router, Request, Response, NextFunction, GetRouter } from '../../../Core';
import {UserBo} from '../Business';
import * as passport from 'passport';
import * as local from 'passport-local';

let router: Router = GetRouter();

// router.post('/login', passport.authenticate('/local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));
const userBo = BoFactory.GetBo(UserBo);

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    let handler = passport.authenticate('local', (err: Error, user: any, info: any) => {
        let status = user ? 200 : 401;
        return res.status(status).end();
    });
    handler(req, res, next);
});

passport.serializeUser((user, done) => {
    done(null, user.Id);
});

passport.deserializeUser((idendity, done) => { //TODO: Analysis required.
    userBo.Find({ where: { Email: idendity.Email } })
        .then((user) => {
            done(null, user.dataValues);
        }).catch((err) => {
            done(err, null);
        });
});

passport.use(new local.Strategy({ usernameField: 'Email', passwordField: 'Password' }, (email, password, done) => {
    userBo.Find({ where: { Email: email } })
        .then((user) => {
            if (!user) {
                throw new Error('User not found.');
            }
            done(null, user.dataValues);
        }).catch((err) => {
            done(err);
        });
}));

export default router;
