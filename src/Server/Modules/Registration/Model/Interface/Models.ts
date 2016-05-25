//import {Models} from '../../../../Core';
import * as i from './UserInterface';
import * as SequelizeStatic  from 'sequelize';
declare global {
    interface Models {
        User: SequelizeStatic.Model<i.UserInstance, i.UserAttributes>;
    }
}
