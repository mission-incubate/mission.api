import { User} from '../model/user';
import {UserBO, BOFactory} from '../bo/UserBo';
import {Request, Response, PageContext } from '../model/requestobj';


export class ServiceFactory {
    public static CreateService<T extends IBaseService>(type: { new (): T }): T {
        return new type();
    }
}

export interface IBaseService {

}

export class BaseService implements IBaseService {
    public GetResponse<T>(data: T, pageContext: PageContext): Response<T> {
        return {
            Data: data,
            PageContext: pageContext,
            Error: null
        };
    }
}

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


