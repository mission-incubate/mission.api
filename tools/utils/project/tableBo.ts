import {BaseBO} from '../../../src/bo';
import {Dal} from '../../../src/dal';
import {asEnumerable, Range} from "linq-ts";

export class TableBO extends BaseBO {
    constructor(dal: Dal) {
        super(dal);
    }

    public async GetAllTableDetails(): Promise<Table[]> {
        await this.dal.Connect();
        let data = await this.dal.ExecuteQuery<Column>(`select 
            t.schema_id as TableId,
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
        let table: Table[] = asEnumerable(data)
            .GroupBy(x => x.TableId)
            .Select(x => <Table>{ Name: x.ColumnName })
            .ToArray();
        return <Table[]>data;
    }
}

export class Table {
    public Name: string;
    public Id: number;
    public Columns: Array<Column>;
}

export class Column {
    public Name: string;
    public Id: number;
}