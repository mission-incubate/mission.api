import {BaseService, BoFactory} from '../../Base';
import { UserBo} from '../Business';
import {ApiRequest, ApiResponse, BaseRequest, ISearchEnums} from '../../../Common';
import {Request } from '../../../Core';
import { UserInstance} from '../Model/Interface';

export class AuthService extends BaseService {
    private userBo: UserBo;
    constructor(req?: Request) {
        super(req);
        this.userBo = BoFactory.GetBo(UserBo, this.Request);
    }

    public async Login(req: ApiRequest<ISearchEnums>): Promise<ApiResponse<UserInstance>> {
        let users = await this.userBo.GetById(req.Id);
        return this.GetResponse(users, req.PageContext);
    }

    public async Logout(req: BaseRequest): Promise<ApiResponse<number>> {
        let id: number = await this.userBo.AddUser(req);
        return this.GetResponse(id);
    }
}
