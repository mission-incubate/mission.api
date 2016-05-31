import {basename, join} from 'path';
import * as SequelizeStatic  from 'sequelize';
import {Sequelize}  from './Vendor';
import {DbConfig} from '../../Config';
import * as glob from 'glob';

class Database {
    private _basename: string;
    private _models: Models;
    private _sequelize: Sequelize;
    constructor() {
        this._basename = basename(module.filename).toLowerCase();
        let db = DbConfig;
        // let dbConfig = configs.getDatabaseConfig();
        // if (dbConfig.logging) {
        //     dbConfig.logging = logger.info;
        // }
        //(SequelizeStatic as any).cls = cls.createNamespace("sequelize-transaction");
        this._sequelize = new SequelizeStatic(db.Database, db.UserName, db.Password, db.Options);
        this._models = ({} as any);
        let modelBasePath = join(__dirname, '../Modules', '/**/*.Model.js');
        console.log(modelBasePath);
        glob(modelBasePath, (err: Error, files: string[]): void => {
            console.log(files);
            files.forEach((file: string) => {
                let model = this._sequelize.import(file);
                (this._models as any)[(model as any).name] = model;
            });
            Object.keys(this._models)
                .forEach((modelName: string) => {
                    if (typeof (this._models as any)[modelName].associate === 'function') {
                        (this._models as any)[modelName].associate(this._models);
                    }
                });
        });
        //this._sequelize.sync(); //TODO: Creating Table -  RND required.
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
export const Dal = database.getSequelize();
