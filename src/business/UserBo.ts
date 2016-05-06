import {BaseBo} from './';
import {PageContext, BaseRequest} from '../common';
import { UserInstance, UserAttributes} from '../models/interfaces/UserInterface';
import * as SStatic  from 'sequelize';


export class UserBo extends BaseBo {
    public async FindById(id: number): Promise<UserInstance> {
        let user = await this.GetModel().findOne({ where: { Id: id } });
        return user;
    }

    public async GetAllUsers(pg: PageContext): Promise<Array<UserInstance>> {
        let users = await this.GetModel().findAll({ limit: pg.PageSize, offset: (pg.PageNumber - 1) * pg.PageSize });
        return users;
    }

    public async AddUser(req: BaseRequest): Promise<number> {
        let ua: UserAttributes = req.Data;
        let user: UserInstance = await this.GetModel().create(ua, { isNewRecord: true });
        return user.Data.Id;
    }

    private GetModel(): SStatic.Model<UserInstance, UserAttributes> {
        return this.Model.User;
    }
}
