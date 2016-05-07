import {BaseService} from './BaseService';
import {BoFactory, UserBo} from '../business';
import {UserRequest, UserResponse, BaseRequest, ISearchEnums} from '../common';
//import {Transaction, Sequelize} from 'sequelize';

export class UserService extends BaseService {
    private userBo: UserBo;
    constructor() {
        super();
        this.userBo = BoFactory.GetBo(UserBo);
    }

    public async FindById(req: UserRequest<ISearchEnums, string>): Promise<UserResponse<any>> {
        if (req.Id < 0) {
            throw 'Invaid Id';
        }
        let user = await this.userBo.FindById(req.Id);
        return this.GetResponse(user);
    }

    public async GetAllUsers(req: UserRequest<ISearchEnums, string>): Promise<UserResponse<Array<any>>> {
        let users = await this.userBo.GetAllUsers(req);
        return this.GetResponse(users, req.PageContext);
    }

    public async AddUser(req: BaseRequest): Promise<UserResponse<number>> {
        let id: number = await this.userBo.AddUser(req);
        return this.GetResponse(id);
    }
}
