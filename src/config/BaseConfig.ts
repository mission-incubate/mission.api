/****************************************************************************************
************Sequelize Database (MSSQL/MYSQL/ORACAL) Config Option Interface *************
****************************************************************************************/
export interface Options {
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
    force: boolean;
    timezone: string;
}
export interface DatabaseConfig {
    UserName: string;
    Password: string;
    Database: string;
    Options: Options;
}
export interface SqlLoggingConfig {
    file: {
        level: string,
        filename: string,
        handleExceptions: boolean,
        json: boolean,
        maxsize: number,
        maxFiles: number,
        colorize: boolean
    };
    console: {
        level: string,
        handleExceptions: boolean,
        json: boolean,
        colorize: boolean
    };
    directory: string;
}
/****************************************************************************************
************************ Entier Application Config **************************************
****************************************************************************************/
export interface ApplicationConfig {
    DefaultPageSize: number;
    WebStaticFile: {
        dotfiles: string;
        etag: boolean;
        extensions: Array<string>;
        index: boolean;
        maxAge: string;
        redirect: boolean;
        setHeaders: Function;
    };
}
/****************************************************************************************
************************ Redis Servce Config - (for Cache & Pub/Sub) ********************
****************************************************************************************/
export interface RedisConfig {
    auth: string;
    host: string;
    keys_pattern: string;
    name: string;
    namespace_separator: string;
    port: number;
    ssh_port: number;
    timeout_connect: number;
    timeout_execute: number;
}
