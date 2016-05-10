import {BaseService} from './BaseService';
import {BoFactory, UserBo} from '../business';
import {UserRequest, UserResponse, BaseRequest, ISearchEnums} from '../common';
import {CacheManager, RedisCacheProvider} from '../common';

export class UserService extends BaseService {
    private userBo: UserBo;
    private cache: CacheManager;
    constructor() {
        super();
        this.userBo = BoFactory.GetBo(UserBo);
        this.cache = new CacheManager(new RedisCacheProvider());
    }

    public async FindById(req: UserRequest<ISearchEnums, string>): Promise<UserResponse<any>> {
        if (req.Id < 0) {
            throw 'Invaid Id';
        }
        let val = await this.cache.GetItem(req.Id.toString(), 'UserService');
        if (!val) {
            console.log('Cache Not available for ' + req.Id);
        }

        let user = await this.userBo.FindById(req.Id);
        if (!val && user && user.dataValues) {
            await this.cache.AddItem(req.Id.toString(), JSON.stringify(user.dataValues), 'UserService');
        }
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
