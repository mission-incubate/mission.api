import * as SStatic  from 'sequelize';
import {models, Instance, Dal, QueryOptions, Sequelize, FindOptions, UpsertOptions, CreateOptions, UpdateOptions} from '../../../Core';
import {ApiRequest} from '../../../Common';
import {IAttributes} from'../Model';

export interface IBaseBo { }

export abstract class BaseBo<TModel extends Instance<IAttributes>, TAttributes extends IAttributes> implements IBaseBo {
    protected Models: Models = models;
    protected Dal: Sequelize = Dal;
    public get Items(): SStatic.Model<TModel, TAttributes> {
        return this.GetModel();
    }
    public Request: ApiRequest<number, string>;
    public constructor(req?: ApiRequest<number, string>) {
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
    public async Find(optins: FindOptions): Promise<TModel> {
        return await this.Items.find(optins);
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
    public MarkAsDelete(entity: TAttributes): void {
        throw 'Not Implemented';
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
        return res[1][0];
    }
    private CheckId(entity: TAttributes): void {
        if (!entity || entity.Id <= 0) {
            throw 'Invalid Id. Operation Faild.';
        }
    }
    // public IQueryable<TObject> Items { get; }
    // public ISession Session { get; protected set; }
    // public System.Type Type { get; }

    // public virtual void Delete(TObject entity);
    // public DTOReader ExecuteProcedureReader(string name, Dictionary<string, object> parameters);
    // public List<Dictionary<string, object>> ExecuteSQLQuery(string sqlText, Dictionary<string, object> parameters);
    // public List<Dictionary<string, object>> ExecuteStoredProcedure(string name, Dictionary<string, object> parameters);
    // public virtual IList<TObject> GetAll();
    // public virtual IList<TObject> GetAll(int maxResults);
    // public virtual TObject GetById(long id);
    // protected IDbTransaction GetIDbTransaction(ITransaction hibernateTx);
    // public virtual TObject GetObjectForUpdate(long id, int rev);
    // protected virtual long GetUserId();
    // public virtual void MarkAsDelete(TObject entity);
    // public virtual void Refresh(TObject entity);
    // public virtual TObject Save(TObject entity);
    // public virtual void SaveOrUpdate(TObject entity);
    // public virtual void Update(TObject entity);
}

export class ProcResult {
    Results: any;
    MetaData: any;
}

export class BoFactory {
    public static GetBo<T extends IBaseBo>(type: { new (req: ApiRequest<number, string>): T }, req?: ApiRequest<number, string>): T {
        return new type(req);
    }
}
