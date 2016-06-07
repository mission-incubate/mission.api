import * as SStatic  from 'sequelize';
import {models, Instance, Dal, QueryOptions, Sequelize} from '../../../Core';
import {UserRequest} from '../../../Common';
import {IAttributes} from'../Model';

export interface IBaseBo { }

export abstract class BaseBo<TModel extends Instance<any>, TAttributes extends IAttributes> implements IBaseBo {
    protected Models: Models = models;
    protected Dal: Sequelize = Dal;
    public get Items(): SStatic.Model<TModel, any> {
        return this.GetModel();
    }
    public Request: UserRequest<number, string>;
    public constructor(req?: UserRequest<number, string>) {
        this.Request = req;
    }
    public abstract GetModel(): SStatic.Model<TModel, TAttributes>;
    public async DeleteById(entity: IAttributes): Promise<number> {
        if (!entity || entity.Id <= 0) {
            throw 'Invalid Id. Can not Delete.';
        }
        return await this.Items.destroy({ where: { Id: entity.Id }, limit: 1 });
    }
    public async ExecuteSQLQuery(queryText: string | { query: string, values: any[] }, param?: QueryOptions): Promise<any> {
        return await Dal.query(queryText, param);
    }
    public ExecuteStoredProcedure(porcName: string, param: any): void {
        throw 'Not Implemented';
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
    public MarkAsDelete(entity: IAttributes): void {
        throw 'Not Implemented';
    }
    public Refresh(entity: IAttributes): void {
        throw 'Not Implemented';
    }
    public async Save(entity: IAttributes): Promise<TModel> {
        return await this.Items.create(entity, { isNewRecord: true });
    }
    public SaveOrUpdate(entity: IAttributes): void {
        throw 'Not Implemented';
    }
    public Update(entity: IAttributes): void {
        throw 'Not Implemented';
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

export class BoFactory {
    public static GetBo<T extends IBaseBo>(type: { new (req: UserRequest<number, string>): T }, req?: UserRequest<number, string>): T {
        return new type(req);
    }
}
