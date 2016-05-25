import * as request from 'supertest';
//import {WebServer } from '../../../Core'; //, Request, Response, NextFunction
import {AppConfig} from '../../../../Config';
//import route from './User';
import bootstrap from '../../../../Bootstrap';

const baseUrl = 'http://127.0.0.1:' + AppConfig.ApiPort;
// const server = new WebServer(AppConfig);
// server.Init();
// server.AddApiRouting('/', route);
// server.Start();
bootstrap();

describe('/User', () => {
    it('POST /FindById', (done) => {
        request(baseUrl)
            .post('/user/FindById')
            .send({
                'Id': 1
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            //.expect('Content-Length', '15')
            .expect(200)
            .end(function (err: any, res: any) {
                if (err) throw err;
                done();
            });
    });
});
