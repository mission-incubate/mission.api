import {BaseService} from './';
import {BoFactory} from '../business';
import {UserRequest, UserResponse} from '../common';
import {UserBo} from '../business/UserBo';
//import {Transaction, Sequelize} from 'sequelize';

export class UserService extends BaseService {
    private userBo: UserBo;
    constructor() {
        super();
        this.userBo = BoFactory.GetBo(UserBo);
    }

    public async FindById(req: UserRequest<string, string>): Promise<UserResponse<any>> {
        if (req.Id < 0) {
            throw 'Invaid Id';
        }
        let user = await this.userBo.FindById(req.Id);
        return this.GetResponse(user);
    }

    public async GetAllUsers(req: UserRequest<string, string>): Promise<UserResponse<Array<any>>> {
        let users = await this.userBo.GetAllUsers(req.PageContext);
        return this.GetResponse(users, req.PageContext);
    }
}

// import {User} from '../model/user';
// import {UserBO} from '../bo/UserBo';
// import 'mission.linq';

// export class UserService extends BaseService {
//     private userbo: UserBO = BOFactory.CreateBO(UserBO);
//     constructor() {
//         super();
//     }
//     public async GetAllUsersAsync(req: Request<string, string>): Promise<Response<User[]>> {
//         let users = await this.userbo.GetAllUsersAsync();
//         return this.GetResponse(users, req.PageContext);
//     }
// }
