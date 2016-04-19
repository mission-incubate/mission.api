import { Config, Connection, Transaction, Request, ConnectionError, recordSet  } from 'mssql';
export { Config } from 'mssql';

export class Dal {
    private connection: Connection;
    private transaction: Transaction;
    private isTransactionEnabled: boolean;
    constructor(config: Config, isTrans?: boolean) {
        this.connection = new Connection(config);
        this.isTransactionEnabled = isTrans;
    }

    public Connect(): Promise<void> {
        let con: Promise<void> = this.connection.connected
            ? new Promise<void>((resolve) => { resolve(); })
            : this.connection.connect();
        return con.then(() => {
            this.transaction = this.isTransactionEnabled ? new Transaction(this.connection) : null;
        });
    }

    //@Validate(connection)
    public Execute(procedure: string): Promise<recordSet> {
        if (!this.connection.connected) {
            throw new ConnectionError('Connection Not Connected');
        }
        return this.GetRequest().execute(procedure);
    }

    public ExecuteNonQuery(command: string): Promise<void> {
        return this.GetRequest().query(command);
    }

    public ExecuteQuery<Entity>(command: string): Promise<Entity[]> {
        return this.GetRequest().query<Entity>(command);
    }

    //for special Query
    public Batch(batch: string): Promise<recordSet> {
        return this.GetRequest().batch(batch);
    }
    //for special Query
    public BatchArray<Entity>(batch: string): Promise<Entity[]> {
        return this.GetRequest().batch<Entity>(batch);
    }

    public Begin(): Promise<void> {
        return this.transaction.begin();
    }
    public Commit(): Promise<void> {
        return this.transaction.commit();
    }
    public Rollback(): Promise<void> {
        return this.transaction.rollback();
    }

    private GetRequest(): Request {
        return this.isTransactionEnabled ? new Request(this.transaction) : new Request(this.connection);
    }
}
