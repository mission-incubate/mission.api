import {IWebServerConfig } from './BaseConfig';
import {AppConfig} from './AppConfig';

export const WebServerConfig: IWebServerConfig = {
    ApiPort: AppConfig.ApiPort,
    IsHttpsEnabled: !!AppConfig.HttpsCertificatepath,
    HttpsCertificatepath: AppConfig.HttpsCertificatepath,
    HttpsKeypath: AppConfig.HttpsKeypath,
    StaticFileConfig: AppConfig.WebStaticFile,
    CorsOptions: {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        exposedHeaders: [],
        credentials: true,
        maxAge: 3600
    }
};
