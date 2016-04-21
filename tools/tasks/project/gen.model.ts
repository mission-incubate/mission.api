import {argv} from 'yargs';
import * as fs from 'fs';
import {join} from 'path';
import * as Handlebars from 'handlebars';
import * as util from 'gulp-util';
import {TableBO} from '../../utils/project/tableBO';
import {BOFactory} from '../../../src/bo';
//import {Dal} from '../../../src/dal';
//import {List} from 'linqts';

export = () => {
    var table = BOFactory.CreateBO(TableBO);
    table.GetAllTableDetails()
        .then((tables) => {
            let tableName = argv.TableName;
            util.log(tableName + ' Model Generation started.');
            table.GetTableDetails(tableName)
                .then((data) => {
                    let source = fs.readFileSync('./tools/generator/templates/model.hbr', 'utf-8');
                    let template = Handlebars.compile(source);
                    let view = { data: data.ToArray(), Name: data.First().Name };
                    util.log(view);
                    var result = template(view);
                    let modelDestPath = './tools/generator/code/model/';
                    if (!fs.existsSync(modelDestPath)) {
                        util.log(modelDestPath);
                        fs.mkdirSync(modelDestPath);
                    }
                    fs.writeFileSync(join(modelDestPath, tableName + 'Dto.ts'), result);
                    util.log(tableName + ' Model Generation end');
                })
                .catch((err) => {
                    util.log(err);
                });
        });
};

