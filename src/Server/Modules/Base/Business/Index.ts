import * as SStatic  from 'sequelize';
import {models, Instance, Dal, QueryOptions, Sequelize, FindOptions, UpsertOptions, CreateOptions, UpdateOptions} from '../../../Core';
import {Request} from '../../../Core';
import {IAttributes} from'../Model';

export interface IBaseBo { }

export abstract class BaseBo<TModel extends Instance<IAttributes>, TAttributes extends IAttributes> implements IBaseBo {
    protected Models: Models = models;
    protected Dal: Sequelize = Dal;
    public get Items(): SStatic.Model<TModel, TAttributes> {
        return this.GetModel();
    }
    protected Request: Request;
    public constructor(req?: Request) {
        this.Request = req;
    }
    public abstract GetModel(): SStatic.Model<TModel, TAttributes>;
    public async DeleteById(entity: TAttributes): Promise<number> {
        this.CheckId(entity);
        return await this.Items.destroy({ where: { Id: entity.Id }, limit: 1 });
    }
    public async ExecuteSQLQuery(queryText: string | { query: string, values: any[] }, param?: QueryOptions): Promise<any> {
        return await Dal.query(queryText, param);
    }
    public async ExecuteStoredProcedure(procName: string, param?: QueryOptions): Promise<ProcResult> {
        return new Promise<ProcResult>((resolver, reject) => {
            Dal.query(procName, param).spread((results: any, metadata: any) => {
                resolver({ Results: results, MetaData: metadata });
            }).catch(reject);
        });
    }
    public async GetById(id: number): Promise<TModel> {
        return await this.Items.findById(id); //findOne({ where: { Id: id } });
    }
    public async Find(options?: FindOptions): Promise<TModel> {
        return await this.Items.find(options);
    }
    public async FindAll(options?: FindOptions): Promise<Array<TModel>> {
        return await this.Items.findAll(options);
    }
    public GetIDbTransaction(transaction: any): void {
        throw 'Not Implemented';
    }
    public async GetObjectForUpdate(id: number, rev: number): Promise<TModel> {
        return await this.Items.findOne({ where: { Id: id, Rev: rev } });
    }
    public GetUserId(): number {
        throw 'Not Implemented';
    }
    public async MarkAsDelete(id: number): Promise<Boolean> {
        // TODO: need to implement.
        let item = await this.GetById(id);
        let rec = (<any>item)['dataValues'];
        rec.Status = 2;
        await this.Items.update(rec, { where: { Id: id } });
        return false;
    }
    public Refresh(entity: TAttributes): void {
        throw 'Not Implemented';
    }
    public async Save(entity: TAttributes, options?: CreateOptions): Promise<TModel> {
        options = options || { isNewRecord: true };
        return await this.Items.create(entity, { isNewRecord: true });
    }
    public async SaveOrUpdate(entity: TAttributes, options?: UpsertOptions): Promise<boolean> {
        return await this.Items.insertOrUpdate(entity, options);
    }
    public async Update(entity: TAttributes, options?: UpdateOptions): Promise<TModel> {
        this.CheckId(entity);
        options = options || { where: { Id: entity.Id }, limit: 1 };
        let res = await this.Items.update(entity, options);
        //TODO: throw if rec not found.
        return res[1][0];
    }

    protected GetAttributes(data: Array<TModel>): Array<TAttributes> {
        let result: Array<any> = [];
        for (let i of data) {
            let at = (<any>i)['dataValues'];
            result.push(at);
        }
        return result;
    }

    private CheckId(entity: TAttributes): void {
        if (!entity || entity.Id <= 0) {
            throw 'Invalid Id. Operation Faild.';
        }
    }
}

export class ProcResult {
    Results: any;
    MetaData: any;
}

export class BoFactory {
    public static GetBo<T extends IBaseBo>(type: { new (req: Request): T }, req?: Request): T {
        return new type(req);
    }
}

export class BO<TModel extends Instance<IAttributes>, TAttributes extends IAttributes> extends BaseBo<TModel, TAttributes> {
    private Model: SStatic.Model<TModel, TAttributes>;
    constructor(model: SStatic.Model<TModel, TAttributes>) {
        super();
        this.Model = model;
    }
    public GetModel(): SStatic.Model<TModel, TAttributes> {
        return this.Model;
    }
}
