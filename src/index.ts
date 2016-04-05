import * as express from 'express';
import * as http from  'http';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';

import * as route from './routes/routes';

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
        self.Express.use(express.static(__dirname + '/www'));
        self.Express.use('/docs',express.static(__dirname + '/docs'));
        self.registerModules();
        return self;
    }
    public start() : void {
        var self = this;
        let Server = http.createServer(/*self.Express*/);
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
    }
}
new WebServer(3000).init().start();
