import {Config} from 'mssql';

class AppSettings {
    HTTPS_ENABLED = this.HTTPS_SERVER_CERT && this.HTTPS_SERVER_KEY_PATH;
    PORT = this.HTTPS_ENABLED ? 443 : 80;
    HTTPS_SERVER_KEY_PATH = '';
    HTTPS_SERVER_CERT = '';
    APP_BASE = '/';
    DOCS = '/docs';
    WWW = '/www';
    OAUTH2: '127.0.0.1:8081';
    AUDIT: '127.0.0.1:8082';
    CACHE: '127.0.0.1:8083';
    DB: Config = {
        //driver: '',
        user: 'sa',
        password: 'irtt',
        server: 'localhost\\SQLEXPRESS',
        //port: 3044,
        domain: '',
        database: 'Natarajan',
        // connectionTimeout: 0,
        // requestTimeout: 0,
        // stream: true,
        // options: { encrypt: false },
        // pool: {
        //     min: 0,
        //     max: 0,
        //     idleTimeoutMillis: 0
        // }
    };
}

const Settings: AppSettings = new AppSettings();
export = Settings;
