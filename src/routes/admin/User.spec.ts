import * as request from 'supertest';
import {WebServer } from '../../Core'; //, Request, Response, NextFunction
import {AppConfig} from '../../config';
import * as route from '../../routes';

const server = new WebServer(AppConfig);
server.Init();
server.AddApiRouting('/', route);
server.Start();

describe('/User', () => {
    it('POST /FindById', async (done) => {
        request(server.App)
            .post('http://127.0.0.1:3000/user/FindById')
            .send({
                'Id': 1
            })
            .set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            //.expect('Content-Length', '15')
            .end(function (err, res) {
                if (err) throw err;

            })
            .expect(200, done);
    });
});
