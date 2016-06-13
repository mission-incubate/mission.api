import * as SStatic  from 'sequelize';
import {BaseBo} from '../../Base';
import {Paginator, BaseRequest, ApiRequest, ISearchEnums} from '../../../common';
import { UserInstance, UserAttributes} from '../Model/Interface';

export class UserBo extends BaseBo<UserInstance, UserAttributes> {
    public async FindById(id: number): Promise<UserInstance> {
        let user = await this.Items.findOne({ where: { Id: id } });
        return user;
    }

    public async GetAllUsers(req: ApiRequest<ISearchEnums>): Promise<Array<UserInstance>> {
        let pg: Paginator = new Paginator(req.PageContext);
        let users = await this.Items.findAll({ limit: pg.Limit, offset: pg.Offset });
        return users;
    }

    public async AddUser(req: BaseRequest): Promise<number> {
        let userAttribute: UserAttributes = req.Data;
        let user: UserInstance = await this.Items.create(userAttribute, { isNewRecord: true });
        return user.dataValues.Id;
    }

    public GetModel(): SStatic.Model<UserInstance, UserAttributes> {
        return this.Models.User;
    }
}
