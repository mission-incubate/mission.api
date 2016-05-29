import * as i from './Interface';
import * as SequelizeStatic  from 'sequelize';
declare global {
    interface Models {
        User: SequelizeStatic.Model<i.UserInstance, i.UserAttributes>;
    }
}
