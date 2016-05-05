import {models} from '../models';
import { UserInstance} from '../models/interfaces/UserInterface';
//import {Transaction, Sequelize} from 'sequelize';


export class UserBO {
    public async FindById(id: number): Promise<UserInstance> {
        let user = await models.User.findOne({ where: { Id: id } });
        return user;
    }
}
