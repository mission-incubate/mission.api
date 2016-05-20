//import * as request from 'supertest';
import {WebServer } from '../../Core'; //, Request, Response, NextFunction
import {AppConfig} from '../../config';
import * as route from '../../routes';

//const baseUrl = 'http://127.0.0.1:' + AppConfig.ApiPort;
const server = new WebServer(AppConfig);
server.Init();
server.AddApiRouting('/', route);
server.Start();

// describe('/User', () => {
//     it('POST /FindById', async (done) => {
//         request(baseUrl)
//             .post('/user/FindById')
//             .send({
//                 'Id': 1
//             })
//             .set('Accept', 'application/json')
//             //.expect('Content-Type', /json/)
//             //.expect('Content-Length', '15')
//             .end(function (err, res) {
//                 if (err) throw err;
//                 console.log(res);
//             })
//             .expect(200, done);
//     });
// });
