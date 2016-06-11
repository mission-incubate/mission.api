import {BoFactory} from '../../Base/Business';
import {Router, Request, Response, NextFunction, GetRouter } from '../../../Core';
import {UserBo} from '../Business';
import * as passport from 'passport';
import * as local from 'passport-local';

let router: Router = GetRouter();
const userBo = BoFactory.GetBo(UserBo);

//TYPE 1
// router.post('/login', (req: Request, res: Response, next: NextFunction) => {
//     let handler = passport.authenticate('local', (err: Error, user: any, info: any) => {
//         let status = user ? 200 : 401;
//         return res.status(status).send({ result: 'success....' });
//     });
//     handler(req, res, next);
// });

//TYPE 2
// router.post('/login',
//     passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login', failureFlash: true }),
//     (req: Request, res: Response, next: NextFunction) => {
//         return res.status(200).send({ result: 'success....' });
//     }
// );

//TYPE 3

router.post('/login',
    passport.authenticate('local'),
    (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).send({ result: 'success....' });
    }
);

passport.serializeUser((user, done) => {
    done(null, user.Id);
});

passport.deserializeUser((id, done) => {
    userBo.Find({ where: { Id: id } })
        .then((user) => { done(null, user.dataValues); })
        .catch((err) => { done(err, null); });
});

passport.use(new local.Strategy({ usernameField: 'UserName', passwordField: 'Password' }, (userName, password, done) => {
    userBo.Find({ where: { UserName: userName } })
        .then((user) => {
            if (!user || !user.dataValues || user.dataValues.Password !== password) {
                return done(null, false);
            }
            return done(null, user.dataValues);
        });
}));

export default router;
