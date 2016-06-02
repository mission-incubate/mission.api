import * as SStatic  from 'sequelize';
import {models, Instance, Dal} from '../../../Core';
import {UserRequest} from '../../../Common';
import {IAttributes} from'../Model';

export interface IBaseBo { }

type TObject = string; //TODO: Not required.

export class BaseBo<T> implements IBaseBo {
    protected Models: Models = models;
    protected Items: T;
    public Request: UserRequest<number, string>;
    public constructor(req: UserRequest<number, string>) {
        this.Request = req;
        this.Items = this.GetModel();
    }
    public GetModel(): T {
        return null;
    }
    public DeleteById(entity: TObject): void {
        //this.Items.destroy({where: });
        throw 'Not Implemented';
    }
    public ExecuteSQLQuery(queryText: string, param: any): void {
        Dal.query(queryText, null);
        throw 'Not Implemented';
    }
    public ExecuteStoredProcedure(porcName: string, param: any): void {
        throw 'Not Implemented';
    }
    public async GetById(id: number): Promise<T> {
         throw 'Not Implemented';
    }
    public GetIDbTransaction(transaction: any): void {
        throw 'Not Implemented';
    }
    public GetObjectForUpdate(id: number, rev: number): void {
        throw 'Not Implemented';
    }
    public GetUserId(): number {
        throw 'Not Implemented';
    }
    public MarkAsDelete(entity: TObject): void {
        throw 'Not Implemented';
    }
    public Refresh(entity: TObject): void {
        throw 'Not Implemented';
    }
    public Save(entity: TObject): void {
        throw 'Not Implemented';
    }
    public SaveOrUpdate(entity: TObject): void {
        throw 'Not Implemented';
    }
    public Update(entity: TObject): void {
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
    public static GetBo<T extends IBaseBo>(type: { new (req: UserRequest<number, string>): T }, req: UserRequest<number, string>): T {
        return new type(req);
    }
}
