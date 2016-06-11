import {BaseService, BoFactory} from '../../Base';
import { UserBo} from '../Business';
import {ApiRequest, ApiResponse, BaseRequest, ISearchEnums} from '../../../Common';
import { UserInstance} from '../Model/Interface';

export class AuthService extends BaseService {
    private userBo: UserBo;
    constructor(req?: ApiRequest<number, string>) {
        super(req);
        this.userBo = BoFactory.GetBo(UserBo, this.Request);
    }

    public async Login(req: ApiRequest<ISearchEnums, string>): Promise<ApiResponse<UserInstance>> {
        let users = await this.userBo.GetById(req.Id);
        return this.GetResponse(users, req.PageContext);
    }

    public async Logout(req: BaseRequest): Promise<ApiResponse<number>> {
        let id: number = await this.userBo.AddUser(req);
        return this.GetResponse(id);
    }
}
