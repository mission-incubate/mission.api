import {argv} from 'yargs';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as util from 'gulp-util';
import {} from '';
import {Dal} from '../../../src/dal';


export = () => {
    util.log('starts...');
    util.log(JSON.stringify(argv));
    util.log(JSON.stringify(argv));
    let source = fs.readFileSync('./tools/generator/templates/service.hbr', 'utf-8');
    let template = Handlebars.compile(source);
    let data = {
        name: 'test.ts',
        msg: 'success.'
    };
    var result = template(data);
    fs.mkdirSync('./tools/generator/code/service/');
    fs.writeFileSync('./tools/generator/code/service/' + data.name, result);
    util.log('end');
};

