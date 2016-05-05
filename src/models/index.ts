import {readdirSync} from 'fs';
import {basename, join} from 'path';
import * as SequelizeStatic  from 'sequelize';
import {Sequelize}  from 'sequelize';
import {SequelizeDb as db} from '../appsettings';

import {UserInstance, UserAttributes} from './interfaces/UserInterface';

export interface Models {
    User: SequelizeStatic.Model<UserInstance, UserAttributes>;
}

class Database {
    private _basename: string;
    private _models: Models;
    private _sequelize: Sequelize;
    constructor() {
        this._basename = basename(module.filename);
        // let dbConfig = configs.getDatabaseConfig();

        // if (dbConfig.logging) {
        //     dbConfig.logging = logger.info;
        // }

        //(SequelizeStatic as any).cls = cls.createNamespace("sequelize-transaction");
        this._sequelize = new SequelizeStatic(db.database, db.username, db.password, db.Options);
        this._models = ({} as any);

        readdirSync(__dirname)
            .filter((file: string) => (file !== this._basename) && (file !== 'interfaces'))
            .forEach((file: string) => {
                let model = this._sequelize.import(join(__dirname, file));
                (this._models as any)[(model as any).name] = model;
            });

        Object.keys(this._models)
            .forEach((modelName: string) => {
                if (typeof (this._models as any)[modelName].associate === 'function') {
                    (this._models as any)[modelName].associate(this._models);
                }
            });
    }

    public getModels(): Models {
        return this._models;
    }

    public getSequelize(): Sequelize {
        return this._sequelize;
    }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
