import * as express from 'express';
import * as http from  'http';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';
import * as Settings from './appsettings';
import * as route from './routes/routes';
import * as fs from 'fs';
import {Server} from 'net';

export class WebServer {
    private Express: express.Express;
    private Port: number;
    constructor(port: number) {
        var self = this;
        self.Port = port;
        self.Express = express();
    }
    public init(): WebServer {
        var self = this;
        self.Express.set('port', self.Port);
        self.Express.use(logger('dev'));
        self.Express.use(bodyParser.json());
        self.Express.use(bodyParser.urlencoded({ extended: false }));
        //self.Express.use(favicon(__dirname + '/www/favicon.ico'));
        self.Express.use(express.static(__dirname + Settings.WWW));
        self.Express.use(Settings.DOCS,express.static(__dirname + Settings.DOCS));
        self.registerModules();
        return self;
    }
    public start() : void {
        let self = this;
        let Server : Server;
        if(Settings.HTTPS_ENABLED) {
            let privateKey  = fs.readFileSync(Settings.HTTPS_SERVER_KEY_PATH, 'utf8');
            let certificate = fs.readFileSync(Settings.HTTPS_SERVER_CERT, 'utf8');
            let credentials = {key: privateKey, cert: certificate};
            Server = https.createServer(credentials, self.Express);
        }
        Server = http.createServer(self.Express);
        Server.listen(self.Port, null, (self.listenerCallback).bind(self));
    }
    private registerModules() :void {
        var self = this;
        self.Express.use('/', route);
        self.Express.use(self.handlerFor404);
        self.Express.use((self.errorHandler).bind(self));
    }
    private handlerFor404(req:express.Request, res:express.Response, next:Function):void {
        let err = new Error('Resource Not Found.');
        //err['status']:any = 404;
        next(err);
    }
    private errorHandler(err: Error, req:express.Request, res:express.Response, next:Function): void {
        var self = this;
        //res.status(err['status'] || 500);
        res.json({ 'error': {
            message: err.message,
            error: self.Express.get('env') === 'development' ? {} : err }
        });
    }
    private listenerCallback(): void {
        var self = this;
        let port = self.Express.get('port');
        console.log('Express server listening on port ' + port);
        console.log(__dirname);
    }
}
new WebServer(Settings.PORT).init().start();
