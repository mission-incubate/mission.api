import { User} from '../model/user';
import {UserBO, BOFactory} from '../bo/UserBo';
import {Request, Response } from '../model/requestobj';


export class ServiceFactory {
    public static CreateService<T extends IBaseService>(type: { new (): T }): T {
        return new type();
    }
}

export class IBaseService {

}

export class UserService implements IBaseService {
    private userbo: UserBO = BOFactory.CreateBO(UserBO);
    public async GetAllUsersAsync(req: Request<string, string>): Promise<Response<User[]>> {
        let res = await this.userbo.GetAllUsersAsync();
        return {
            Data: res,
            PageContext: req.PageContext,
            Error: null
        };
    }
}


