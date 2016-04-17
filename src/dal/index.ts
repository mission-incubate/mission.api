import { Config, Connection, Transaction, Request, ConnectionError, recordSet  } from 'mssql';
export { Config } from 'mssql';

export class Dal {
    private connection: Connection;
    private transaction: Transaction;
    private isTransactionEnabled: boolean;
    constructor(config: Config, isTrans: boolean ) {
        this.connection = new Connection(config);
        this.isTransactionEnabled = isTrans;
    }
    public Connect(): Promise<void> {
        return this.connection.connect()
            .then(() => {
                this.transaction = this.isTransactionEnabled ? new Transaction(this.connection) : null;
            });
    }
    //@Validate(connection)
    public Execute(procedure: string): Promise<recordSet> {
        if (!this.connection.connected) {
            throw new ConnectionError('Connection Not Connected');
        }
        return this.GetRequest().execute(procedure).catch(this.ErrorHandler);
    }

    public ExecuteNonQuery(command: string): Promise<void> {
        return this.GetRequest().query(command).catch(this.ErrorHandler);
    }

    public ExecuteQuery<Entity>(command: string): Promise<Entity[]> {
        return this.GetRequest().query<Entity>(command).catch(this.ErrorHandler);
    }

    //for special Query
    public Batch(batch: string): Promise<recordSet> {
        return this.GetRequest().batch(batch).catch(this.ErrorHandler);
    }
    //for special Query
    public BatchArray<Entity>(batch: string): Promise<Entity[]> {
        return this.GetRequest().batch<Entity>(batch).catch(this.ErrorHandler);
    }

    public Begin(): Promise<void> {
        return this.transaction.begin().catch(this.ErrorHandler);
    }
    public Commit(): Promise<void> {
        return this.transaction.commit().catch(this.ErrorHandler);
    }
    public Rollback(): Promise<void> {
        return this.transaction.rollback();
    }

    private GetRequest(): Request {
        return this.isTransactionEnabled ? new Request(this.transaction) : new Request(this.connection);
    }

    private ErrorHandler(err: Error): void {
        if (this.isTransactionEnabled) {
            this.Rollback();
        }
        console.log(err.name + err.message + err.stack);
    }
}

// function Validate(con: Connection) {
//     if (con.connected) {
//         throw new ConnectionError('Connection is not connected with db.');
//     }
// }
