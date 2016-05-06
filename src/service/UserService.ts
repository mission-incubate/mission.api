import {BaseService} from './';
import {BoFactory} from '../business';
import {UserRequest, UserResponse, BaseRequest} from '../common';
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
        let users = await this.userBo.GetAllUsers(req);
        return this.GetResponse(users, req.PageContext);
    }

    public async AddUser(req: BaseRequest): Promise<UserResponse<number>> {
        let id: number = await this.userBo.AddUser(req);
        return this.GetResponse(id);
    }
}
