/****************************************************************************************
************************ Web Server Config Interface ************************************
****************************************************************************************/
import {Response } from 'express-serve-static-core';

export interface IStaticFileConfig {
    dotfiles: string;
    etag: boolean;
    extensions: Array<string>;
    index: boolean | Array<string>;
    maxAge: string;
    redirect: boolean;
    setHeaders: (res: Response, path: string, stat: any) => any;
}

export interface IWebServerConfig {
    ApiPort: number;
    IsHttpsEnabled?: boolean;
    HttpsCertificatepath?: string;
    HttpsKeypath?: string;
}
