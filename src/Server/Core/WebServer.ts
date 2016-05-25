import * as express from 'express';
import {Router, Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express-serve-static-core';
import * as http from  'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';
import * as fs from 'fs';
import {Server} from 'net';
import {IWebServerConfig, IStaticFileConfig} from '../../Config';

export {Router, Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler} from 'express-serve-static-core';
export const GetRouter = express.Router;

export class WebServer {
    public Config: IWebServerConfig;
    public App: Express;
    //private Port: number;
    constructor(webconfig: IWebServerConfig) {
        var self = this;
        self.Config = webconfig;
        self.App = express();
    }

    public Init(): WebServer {
        var self = this;
        self.App.set('port', self.Config.ApiPort);
        self.App.use(logger('dev'));
        self.App.use(bodyParser.json());
        self.App.use(bodyParser.urlencoded({ extended: false }));
        return self;
    }
    public AddStaticFileRouting(route: string, path: string, config: IStaticFileConfig): void {
        var self = this;
        self.App.use(route, express.static(path, config));
    }

    public AddApiRouting(route: string, router: Router): void {
        var self = this;
        self.App.use(route, router);
    }

    public Start(): void {
        let self = this;
        self.registerModules();
        let Server: Server;
        if (this.Config.IsHttpsEnabled) {
            let privateKey = fs.readFileSync(this.Config.HttpsKeypath, 'utf8');
            let certificate = fs.readFileSync(this.Config.HttpsCertificatepath, 'utf8');
            let credentials = { key: privateKey, cert: certificate };
            Server = https.createServer(credentials, self.App);
        } else {
            Server = http.createServer(self.App);
        }
        Server.listen(self.Config.ApiPort, null, (self.listenerCallback).bind(self));
    }

    // private configure(): void {
    //     var self = this;
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
        var self = this;
        self.App.use(self.HandlerFor404);
        self.App.use((self.ErrorHandler).bind(self));
    }
    private listenerCallback(): void {
        var self = this;
        let port = self.App.get('port');
        console.log('Express server listening on port :' + port);
        console.log('Application Path :' + __dirname);
        console.log('Evironment :' + process.env.NODE_ENV);
    }
}
