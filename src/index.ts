import {Bootstrap} from './Bootstrap';
if (process.env.NODE_ENV !== 'production') {
    debugger;
}
let app = new Bootstrap();
app.Init().Start();
