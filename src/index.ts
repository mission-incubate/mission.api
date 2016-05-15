import * as express from 'express';
import {Express, Request, Response, NextFunction } from 'express-serve-static-core';
import * as http from  'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';
import * as route from './routes';
import * as fs from 'fs';
import {Server} from 'net';
import {UserResponse, IBaseDto} from './common';
import {AppConfig} from './config';

export class WebServer {
    public App: Express;
    private Port: number;
    constructor(port: number) {
        var self = this;
        self.Port = port;
        self.App = express();
    }
    public Init(): WebServer {
        var self = this;
        self.App.set('port', self.Port);
        self.App.use(logger('dev'));
        self.App.use(bodyParser.json());
        self.App.use(bodyParser.urlencoded({ extended: false }));
        self.App.use(AppConfig.WebBasePath, express.static(__dirname + AppConfig.WebBasePath, AppConfig.WebStaticFile));
        self.App.use(AppConfig.DocsBasepath, express.static(__dirname + AppConfig.DocsBasepath, AppConfig.WebStaticFile));
        self.registerModules();
        return self;
    }

    public Start(): void {
        let self = this;
        let Server: Server;
        if (AppConfig.IsHttpsEnabled) {
            let privateKey = fs.readFileSync(AppConfig.HttpsKeypath, 'utf8');
            let certificate = fs.readFileSync(AppConfig.HttpsCertificatepath, 'utf8');
            let credentials = { key: privateKey, cert: certificate };
            Server = https.createServer(credentials, self.App);
        } else {
            Server = http.createServer(self.App);
        }
        Server.listen(self.Port, null, (self.listenerCallback).bind(self));
    }
    private registerModules(): void {
        var self = this;
        self.App.use('/', route);
        self.App.use(self.handlerFor404);
        self.App.use((self.errorHandler).bind(self));
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
    private handlerFor404(req: Request, res: Response, next: NextFunction): void {
        let err = new Error('Resource Not Found.');
        next(err);
    }
    private errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
        var out: UserResponse<IBaseDto> = {
            Data: null,
            PageContext: null,
            Error: { Code: null, Message: process.env.NODE_ENV === 'development' ? err.message + ' Stack :' + err.stack : null }
        };
        res.status(404).json(out);
    }
    private listenerCallback(): void {
        var self = this;
        let port = self.App.get('port');
        console.log('Express server listening on port :' + port);
        console.log('Application Path :' + __dirname);
        console.log('Evironment :' + process.env.NODE_ENV);
    }
}
let server = new WebServer(AppConfig.ApiPort);
server.Init().Start();
export const App = server.App;
