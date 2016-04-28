import {BaseBO} from '../../../src/bo';
import {Dal} from '../../../src/dal';

export class TableBO extends BaseBO {
    constructor(dal: Dal) {
        super(dal);
    }

    public AllColumns: Array<Column>;

    public async GetTableDetails(tableName: string): Promise<Array<Column>> {
        await this.GetAllColumnDetails();
        return <Column[]>this.AllColumns.Where(x => x.Name.toLowerCase() === tableName.toLowerCase());
    }

    public async GetAllColumnDetails(): Promise<Array<Column>> {
        if (!this.AllColumns) {
            await this.dal.Connect();
            let data = await this.dal.ExecuteQuery<Column>(`select 
            t.Name,
            c.column_id as ColumnId,
            c.name as ColumnName,
            c.max_length as [MaxLength],
            c.precision as [Precision],
            c.scale as Scale,
            c.is_nullable as IsNullable,
            c.is_identity as IsIdentity,
            tp.name as Type
            from sys.tables t
            left join sys.columns c on t.object_id = c.object_id
            left join sys.types tp on c.system_type_id = tp.system_type_id
            where t.type = 'U'`);
            this.AllColumns = data;
        }
        return this.AllColumns;
    }
}

export class Column {
    public Name: string;
    public ColumnId: number;
    public ColumnName: string;
    public MaxLength: number;
    public Precision: number;
    public Scale: number;
    public IsNullable: boolean;
    public IsIdentity: boolean;
    public Type: string;
}
