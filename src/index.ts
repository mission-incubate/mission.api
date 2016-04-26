import * as express from 'express';
import {Express, Request, Response, NextFunction } from 'express-serve-static-core';
import * as http from  'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';
import {
    HTTPS_ENABLED,
    WWW, DOCS, PORT,
    HTTPS_SERVER_CERT,
    HTTPS_SERVER_KEY_PATH
} from './appsettings';
import * as route from './routes/routes';
import * as fs from 'fs';
import {Server} from 'net';
import * as core from './model';

export class WebServer {
    private App: Express;
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
        self.App.use(express.static(__dirname + WWW));
        self.App.use(DOCS, express.static(__dirname + DOCS));
        self.registerModules();
        return self;
    }
    public Start(): void {
        let self = this;
        let Server: Server;
        if (HTTPS_ENABLED) {
            let privateKey = fs.readFileSync(HTTPS_SERVER_KEY_PATH, 'utf8');
            let certificate = fs.readFileSync(HTTPS_SERVER_CERT, 'utf8');
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
    private handlerFor404(req: Request, res: Response, next: NextFunction): void {
        let err = new Error('Resource Not Found.');
        next(err);
    }
    private errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
        var out: core.Response<core.IBaseDto> = {
            Data: null,
            PageContext: null,
            Error: { Code: null, Message: process.env.NODE_ENV === 'development' ? err.message : null }
        };
        res.json(out);
    }
    private listenerCallback(): void {
        var self = this;
        let port = self.App.get('port');
        console.log('Express server listening on port :' + port);
        console.log('Application Path :' + __dirname);
        console.log('Evironment :' + process.env.NODE_ENV);
    }
}
new WebServer(PORT).Init().Start();
