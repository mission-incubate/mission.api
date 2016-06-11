import {BaseService, BoFactory} from '../../Base';
import { UserBo} from '../Business';
import {ApiRequest, ApiResponse, BaseRequest, ISearchEnums} from '../../../Common';
import {CacheManager, RedisCacheProvider} from '../../../Core';
import { UserInstance} from '../Model/Interface';

export class UserService extends BaseService {
    private userBo: UserBo;
    private cache: CacheManager;
    constructor(req?: ApiRequest<number, string>) {
        super(req);
        this.userBo = BoFactory.GetBo(UserBo, this.Request);
        this.cache = new CacheManager(new RedisCacheProvider());
    }

    public async FindById(req: ApiRequest<ISearchEnums, string>): Promise<ApiResponse<UserInstance>> {
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

    public async GetAllUsers(req: ApiRequest<ISearchEnums, string>): Promise<ApiResponse<Array<UserInstance>>> {
        let users = await this.userBo.GetAllUsers(req);
        return this.GetResponse(users, req.PageContext);
    }

    public async AddUser(req: BaseRequest): Promise<ApiResponse<number>> {
        let id: number = await this.userBo.AddUser(req);
        return this.GetResponse(id);
    }
}
