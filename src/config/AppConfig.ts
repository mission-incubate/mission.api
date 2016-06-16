import {IApplicationConfig} from './BaseConfig';

export class ApplicationConfig {
    /************* Web Server config**************/
    SSL_CERTIFICATE_PATH        = '';
    SSL_KEY_PATH                = '';
    PORT                        = this.SSL_CERTIFICATE_PATH ? 443 : 80;
    DEFAULT_PAGE_SIZE           = 50;
    WEB_APPLICATION_PATH        = '/www';
    API_DOCUMENT_PATH           = '/docs';
    CORS_ENABLED                = false;
    /************* Database config**************/
    DIALECT                     = 'mysql';
    DATABASE_NAME               = 'natarajan';
    DATABASE_USER_NAME          = 'root';
    DATABASE_PASSWORD           = 'irtt';
    DATABASE_HOST_NAME          = 'localhost';
    DATABASE_PORT               = 3306;
    /************* Cache config**************/
    CACHE_ENABLED               = true;
    CACHE_HOST_NAME             = 'localhost';
    CACHE_AUTH                  = '';
    CACHE_PORT                  = 6379;
    CACHE_SSH_PORT              = 22;
    /************* Session config**************/
    SESSION_SECRET              = 'SecretKey';
    SESSION_MAX_AGE             = 1000 * 60 * 10;
}


export const AppConfig: IApplicationConfig = {
    AppBase: '/',
    HttpsCertificatepath: '',
    HttpsKeypath: '',
    // IsHttpsEnabled: false,
    DefaultPageSize: 50,
    ApiPort: this.IsHttpsEnabled ? 443 : 3000,
    WebBasePath: '/www',
    DocsBasepath: '/docs',
    WebStaticFile: {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: ['index.html', 'index.htm'],
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res: any, path: string, stat: string) {
            res.set('x-timestamp', Date.now().toString());
        }
    }
};
