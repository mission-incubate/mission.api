import * as SStatic  from 'sequelize';
import {models, Instance, Dal, QueryOptions, Sequelize} from '../../../Core';
import {UserRequest} from '../../../Common';
import {IAttributes} from'../Model';

export interface IBaseBo { }

export abstract class BaseBo<TModel extends Instance<IAttributes>, TAttributes extends IAttributes> implements IBaseBo {
    protected Models: Models = models;
    protected Dal: Sequelize = Dal;
    public get Items(): SStatic.Model<TModel, TAttributes> {
        return this.GetModel();
    }
    public Request: UserRequest<number, string>;
    public constructor(req?: UserRequest<number, string>) {
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
        return await this.Items.findOne({ where: { Id: id } });
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
    public async Save(entity: TAttributes): Promise<TModel> {
        this.CheckId(entity);
        return await this.Items.create(entity, { isNewRecord: true });
    }
    public async SaveOrUpdate(entity: TAttributes): Promise<TModel> {
        let res: TModel;
        if (entity && entity.Id > 0) {
            res = await this.Save(entity);
        } else {
            res = await this.Update(entity);
        }
        return res;
    }
    public async Update(entity: TAttributes): Promise<TModel> {
        let res = await this.Items.update(entity, { where: { Id: entity.Id }, limit: 1 });
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
    public static GetBo<T extends IBaseBo>(type: { new (req: UserRequest<number, string>): T }, req?: UserRequest<number, string>): T {
        return new type(req);
    }
}
