import * as SStatic  from 'sequelize';
import {BaseBo} from './';
import {PageContext, BaseRequest, UserRequest, ISearchEnums} from '../common';
import { UserInstance, UserAttributes} from '../models/interfaces';

export class UserBo extends BaseBo {
    public async FindById(id: number): Promise<UserInstance> {
        let user = await this.GetModel().findOne({ where: { Id: id } });
        return user;
    }

    public async GetAllUsers(req: UserRequest<ISearchEnums, string>): Promise<Array<UserInstance>> {
        let pg: PageContext = req.PageContext;
        let users = await this.GetModel().findAll({ limit: pg.PageSize, offset: (pg.PageNumber - 1) * pg.PageSize });
        return users;
    }

    public async AddUser(req: BaseRequest): Promise<number> {
        let userAttribute: UserAttributes = req.Data;
        let user: UserInstance = await this.GetModel().create(userAttribute, { isNewRecord: true });
        return user.dataValues.Id;
    }

    private GetModel(): SStatic.Model<UserInstance, UserAttributes> {
        return this.Model.User;
    }
}
