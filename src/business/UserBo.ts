import {BaseBo} from './';
import {PageContext} from '../common';
import { UserInstance, UserAttributes} from '../models/interfaces/UserInterface';
import * as SStatic  from 'sequelize';


export class UserBo extends BaseBo {
    public async FindById(id: number): Promise<UserInstance> {
        let user = await this.GetModel().findOne({ where: { Id: id } });
        return user;
    }

    public async GetAllUsers(pg: PageContext): Promise<Array<UserInstance>> {
        let users = await this.GetModel().findAll({ limit: pg.Limit, offset: pg.Offset });
        return users;
    }

    private GetModel(): SStatic.Model<UserInstance, UserAttributes> {
        return this.Model.User;
    }
}
