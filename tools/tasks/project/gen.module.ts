import {argv} from 'yargs';
import * as util from 'gulp-util';
import {join} from 'path';
import {existsSync, mkdirSync} from 'fs';
import {Generator} from '../../utils/project/generator';
import {MODULE_TEMPLATE_BASEPATH, GEN_CODE_MODULE_DIR} from '../../config';

export = (): void => {
    if (!argv.module && !argv.all && !argv.list) {
        DisplayHelp();
        //return;
    }
    let context: Context = require('../../../src/Server/Modules/Modules.json');
    CreateDir(GEN_CODE_MODULE_DIR);
    context.Modules.forEach(x => {
        log(x.ModuleName + ' started.');
        GenerateIndex(x);
        GenerateBusiness(x);
        GenerateModel(x);
        GenerateRouter(x);
        GenerateService(x);
        log(x.ModuleName + ' completed.');
    });
};

function GenerateIndex(moduleParam: Module): void {
    let modulePaht = join(GEN_CODE_MODULE_DIR, moduleParam.ModuleName);
    CreateDir(modulePaht);
    let indexTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Index.hbr');
    Generator.Generate(indexTemplatePath, modulePaht, null, 'Index', '.ts');
};

function GenerateBusiness(moduleParam: Module): void {
    let codePath = join(GEN_CODE_MODULE_DIR, moduleParam.ModuleName, 'Business');
    CreateDir(codePath);
    let boTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Business', 'Business.hbr');
    moduleParam.Tables.forEach(x => {
        Generator.Generate(boTemplatePath, codePath, x, x.Name, 'Bo.ts');
    });
    let indexTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Business', 'Index.hbr');
    Generator.Generate(indexTemplatePath, codePath, moduleParam.Tables, 'Index', '.ts');
};

function GenerateModel(moduleParam: Module): void {
    let modelPath = join(GEN_CODE_MODULE_DIR, moduleParam.ModuleName, 'Model');
    CreateDir(modelPath);
    GenerateModelInterface(moduleParam);
    let modelTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Model', 'Model.hbr');
    moduleParam.Tables.forEach(x => {
        Generator.Generate(modelTemplatePath, modelPath, x, x.Name, '.Model.ts');
    });
    let modelsTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Model', 'Models.hbr');
    Generator.Generate(modelsTemplatePath, modelPath, moduleParam.Tables, 'Models', '.ts');
};

function GenerateModelInterface(moduleParam: Module): void {
    let modelInterfacePath = join(GEN_CODE_MODULE_DIR, moduleParam.ModuleName, 'Model', 'Interface');
    CreateDir(modelInterfacePath);
    let ifTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Model', 'Interface', 'Interface.hbr');
    moduleParam.Tables.forEach(x => {
        Generator.Generate(ifTemplatePath, modelInterfacePath, x, x.Name, 'Interface.ts');
    });
    let indexTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Model', 'Interface', 'Index.hbr');
    Generator.Generate(indexTemplatePath, modelInterfacePath, moduleParam.Tables, 'Index', '.ts');
};

function GenerateRouter(moduleParam: Module): void {
    let routerPath = join(GEN_CODE_MODULE_DIR, moduleParam.ModuleName, 'Router');
    CreateDir(routerPath);
    let routeTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Router', 'Router.hbr');
    moduleParam.Tables.forEach(x => {
        Generator.Generate(routeTemplatePath, routerPath, x, x.Name, 'Route.ts');
    });
    let routeSpecTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Router', 'Router.spec.hbr');
    moduleParam.Tables.forEach(x => {
        Generator.Generate(routeSpecTemplatePath, routerPath, x, x.Name, 'Route.spec.ts');
    });
    let routerIndexTemplate = join(MODULE_TEMPLATE_BASEPATH, 'Router', 'Index.hbr');
    Generator.Generate(routerIndexTemplate, routerPath, moduleParam.Tables, 'Index', '.ts');
};

function GenerateService(moduleParam: Module): void {
    let servicePath = join(GEN_CODE_MODULE_DIR, moduleParam.ModuleName, 'Service');
    CreateDir(servicePath);
    let serviceTemplatePath = join(MODULE_TEMPLATE_BASEPATH, 'Service', 'Service.hbr');
    moduleParam.Tables.forEach(x => {
        Generator.Generate(serviceTemplatePath, servicePath, x, x.Name, 'Service.ts');
    });
    let serviceIndexTemplate = join(MODULE_TEMPLATE_BASEPATH, 'Service', 'Index.hbr');
    Generator.Generate(serviceIndexTemplate, servicePath, moduleParam.Tables, 'Index', '.ts');
};

function CreateDir(path: string): void {
    if (!existsSync(path)) {
        mkdirSync(path);
    }
};

function log(message: string) {
    if (argv.log) {
        util.log(message);
    }
};

function DisplayHelp(): void {
    util.log(`
usage
gulp gen.module --module <modulename> [--log]   # to generate module class for a table
gulp gen.module --all [--log]                   # to generage module class for all table
gulp gen.module --list [--log]                  # to list all available tables    
gulp gen.module --help [--log]                  # to view help
`);
};



interface Table {
    Name: string;
    Details: Array<any>;
}

interface Module {
    ModuleName: string;
    Tables: Array<Table>;
}

interface Context {
    Modules: Array<Module>;
}
