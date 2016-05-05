import {readdirSync} from 'fs';
import {basename, join} from 'path';
import * as Sequelize from 'sequelize';
import {SequelizeDb} from '../appsettings';

type Model = Sequelize.Model<any, any>; //TODO

interface DbConnection {
    User: Model;
}

let db: any = {};
let sequelize = new Sequelize(SequelizeDb.DataBase, SequelizeDb.UserName, SequelizeDb.Password, SequelizeDb.Options);
var baseFileName = basename(module.filename);

readdirSync(__dirname)
    .filter((file: string) => (file.indexOf('.') !== 0) && (file !== baseFileName) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        var model: any = sequelize['import'](join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db.modelName.associate) {
        db.modelName.associate(db);
    }
});

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

export default <DbConnection>db;

