import * as sequelize from 'sequelize';
import {Sequelize, Options } from 'sequelize';

export class DbConfig {
    DataBase: string;
    UserName: string;
    Password: string;
    Options: Options;
}

export class Dal {
    private Sequelize: Sequelize;
    constructor(config: DbConfig) {
        this.Sequelize = new sequelize(config.DataBase, config.UserName, config.Password);
    }

    public GetDal(): Sequelize {
        return this.Sequelize;
    }
}


//var sequelize = new Sequelize('database', 'username', 'password');

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('database', 'username', 'password');

// var User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE
// });

// sequelize.sync().then(function() {
//   return User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
// }).then(function(jane) {
//   console.log(jane.get({
//     plain: true
//   }));
// });
