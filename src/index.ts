import {WebServer, Request, Response, NextFunction } from './Core';
import {AppConfig} from './config';
import * as route from './routes';
import {UserResponse, IBaseDto} from './common';

const bootstrap = () => {
    let server = new WebServer(AppConfig);
    server.ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
        var out: UserResponse<IBaseDto> = {
            Data: null,
            PageContext: null,
            Error: { Code: null, Message: process.env.NODE_ENV === 'development' ? err.message + ' Stack :' + err.stack : null }
        };
        res.status(404).json(out);
    };
    server.Init();
    server.AddStaticFileRouting(AppConfig.WebBasePath, __dirname + AppConfig.WebBasePath, AppConfig.WebStaticFile);
    server.AddStaticFileRouting(AppConfig.DocsBasepath, __dirname + AppConfig.DocsBasepath, AppConfig.WebStaticFile);
    server.AddApiRouting('/', route);
    server.Start();
};
debugger;
bootstrap(); //App Entry point.
