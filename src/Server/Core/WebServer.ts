import * as express from 'express';
import {Router, Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express-serve-static-core';
import * as http from  'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from  'morgan';
import * as fs from 'fs';
import {Server} from 'net';
import {IWebServerConfig, IStaticFileConfig} from '../../Config';
import * as cors from 'cors';

export {Router, Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler} from 'express-serve-static-core';
export const GetRouter = express.Router;

export class WebServer {
    public Config: IWebServerConfig;
    public App: Express;
    public Server: Server;
    //private Port: number;
    constructor(webconfig: IWebServerConfig) {
        let self = this;
        self.Config = webconfig;
        self.App = express();
    }

    public Init(): WebServer {
        let self = this;
        let app = self.App;
        let c = self.Config;
        app.set('port', c.ApiPort);
        app.options('*', cors(c.CorsOptions));
        app.use(cors(c.CorsOptions));
        app.use(logger('dev'));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        return self;
    }
    public AddStaticFileRouting(route: string, path: string, config: IStaticFileConfig): void {
        let self = this;
        self.App.use(route, express.static(path, config));
    }

    public AddApiRouting(route: string, router: Router): void {
        let self = this;
        self.App.use(route, router);
    }

    public Start(): WebServer {
        let self = this;
        self.registerModules();
        if (self.Config.IsHttpsEnabled) {
            let privateKey = fs.readFileSync(self.Config.HttpsKeypath, 'utf8');
            let certificate = fs.readFileSync(self.Config.HttpsCertificatepath, 'utf8');
            let credentials = { key: privateKey, cert: certificate };
            self.Server = https.createServer(credentials, self.App);
        } else {
            self.Server = http.createServer(self.App);
        }
        self.Server.listen(self.Config.ApiPort, null, (self.listenerCallback).bind(self));
        return self;
    }

    public Stop(callback?: Function): WebServer {
        let self = this;
        this.Server.close(callback);
        console.log('Express server stop');
        return self;
    }
    // private configure(): void {
    //     let self = this;
    //     self.App.configure('development', () => {
    //         //TODO:
    //     });
    //     self.App.configure('testing', () => {
    //         //TODO:
    //     });
    //     self.App.configure('production', () => {
    //         //TODO:
    //     });
    // }
    public HandlerFor404: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
        let err = new Error('Resource Not Found.');
        next(err);
    }
    public ErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
        console.error(err);
        res.status(404).json(err);
    }
    private registerModules(): void {
        let self = this;
        self.App.use(self.HandlerFor404);
        self.App.use((self.ErrorHandler).bind(self));
    }
    private listenerCallback(): void {
        let self = this;
        let port = self.App.get('port');
        console.log('Express server listening on port :' + port);
        console.log('Application Path :' + __dirname);
        console.log('Evironment :' + process.env.NODE_ENV);
    }
}
