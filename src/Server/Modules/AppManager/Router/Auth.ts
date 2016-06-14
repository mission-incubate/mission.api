import {BoFactory} from '../../Base/Business';
import {Router, Request, Response, NextFunction, GetRouter } from '../../../Core';
import {UserBo} from '../Business';
import * as passport from 'passport';
import * as local from 'passport-local';

// router.post('/login',
//     passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/login', failureFlash: true }),
//     (req: Request, res: Response, next: NextFunction) => {
//         return res.status(200).send({ result: 'success....' });
//     }
// );

const userBo = BoFactory.GetBo(UserBo);
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
        }).catch(console.error);
}));

class Auth {
    public static async Login(req: Request, res: Response, next: NextFunction): Promise<any> {
        return res.status(200).send({ result: 'success....' });
    }
    public static async Logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        return req.logout();
    }
}

let router: Router = GetRouter();
router.post('/' + Auth.Login.name, passport.authenticate('local'), Auth.Login);
router.post('/' + Auth.Logout.name, Auth.Logout);
export default router;
