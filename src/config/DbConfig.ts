import {DatabaseConfig} from './BaseConfig';

export const DbConfig: DatabaseConfig = {
    UserName: 'sa',
    Password: 'irtt',
    Database: 'Natarajan',
    Options: {
        host: '127.0.0.1',
        port: 1433,
        dialect: 'mssql',
        logging: false,
        force: true,
        timezone: '+12:00'
    }
};
