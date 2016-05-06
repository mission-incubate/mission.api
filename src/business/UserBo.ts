import {BaseBo} from './';
import {PageContext, BaseRequest, UserRequest} from '../common';
import { UserInstance, UserAttributes} from '../models/interfaces/UserInterface';
import * as SStatic  from 'sequelize';

export class UserBo extends BaseBo {
    public async FindById(id: number): Promise<UserInstance> {
        let user = await this.GetModel().findOne({ where: { Id: id } });
        return user;
    }

    public async GetAllUsers(req: UserRequest<string, string>): Promise<Array<UserInstance>> {
        let pg = req.PageContext;
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
