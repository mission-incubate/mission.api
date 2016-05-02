import {BaseService} from './';
import {BOFactory} from '../bo';
import {Request, Response} from '../model';
import {User} from '../model/user';
import {UserBO} from '../bo/UserBo';
import 'mission.linq';

export class UserService extends BaseService {
    private userbo: UserBO = BOFactory.CreateBO(UserBO);
    constructor() {
        super();
    }
    public async GetAllUsersAsync(req: Request<string, string>): Promise<Response<User[]>> {
        let users = await this.userbo.GetAllUsersAsync();
        return this.GetResponse(users, req.PageContext);
    }
}
