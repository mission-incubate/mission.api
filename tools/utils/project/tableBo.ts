import {BaseBo} from '../../../src/Server/Modules/Base';
import * as SequelizeStatic  from 'sequelize';
import {Sequelize, QueryTypes}  from 'sequelize';
import {DbConfig} from '../../../src/Config';

export class TableBO extends BaseBo {
    public AllColumns: Array<Column>;
    private Dal: Sequelize;
    public constructor() {
        super(null);
        this.Dal = new SequelizeStatic(DbConfig.Database, DbConfig.UserName, DbConfig.Password, DbConfig.Options);
    }

    public async GetColumnDetails(tableName: string): Promise<Array<Column>> {
        let qryRepo = new QueryRepo();
        let qry = qryRepo.ColumnDetailsQuery[DbConfig.Options.dialect];
        let data = await this.Dal.query(qry, { replacements: { TableName: tableName }, type: QueryTypes.SELECT });
        return data;
    }

    // public async GetTableDetails(tableName: string): Promise<Array<Column>> {

    //     await this.GetAllColumnDetails();
    //     return <Column[]>this.AllColumns.Where(x => x.Name.toLowerCase() === tableName.toLowerCase());
    // }

    // public async GetAllColumnDetails(): Promise<Array<Column>> {
    //     if (!this.AllColumns) {
    //         await this.Dal.Connect();
    //         let data = await this.Dal.ExecuteQuery<Column>(`select 
    //         t.Name,
    //         c.column_id as ColumnId,
    //         c.name as ColumnName,
    //         c.max_length as [MaxLength],
    //         c.precision as [Precision],
    //         c.scale as Scale,
    //         c.is_nullable as IsNullable,
    //         c.is_identity as IsIdentity,
    //         tp.name as Type
    //         from sys.tables t
    //         left join sys.columns c on t.object_id = c.object_id
    //         left join sys.types tp on c.system_type_id = tp.system_type_id
    //         where t.type = 'U'`);
    //         this.AllColumns = data;
    //     }
    //     return this.AllColumns;
    // }
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

export interface Table {
    Name: string;
    Details: Array<Column>;
}

export interface Module {
    ModuleName: string;
    Tables: Array<Table>;
}

export interface Context {
    Modules: Array<Module>;
}



class QueryRepo {
    ColumnDetailsQuery: IQueryRepo;
    constructor() {
        this.ColumnDetailsQuery = {
            mssql: `select 
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
                    where t.type = 'U'
                    and t.Name = :TableName
            `,
            mysql: `select 
                    t.Table_Name 'Name',
                    c.ORDINAL_POSITION 'ColumnId', 
                    c.column_name 'ColumnName',
                        c.CHARACTER_MAXIMUM_LENGTH 'MaxLength',
                        c.NUMERIC_PRECISION 'Precision',
                        c.NUMERIC_SCALE 'Scale',
                    case c.Is_Nullable 
                        when 'YES' then 1 
                                else 0 
                    end 'IsNullable',
                        case c.EXTRA 
                        when 'auto_increment' then 1 
                                else 0 
                    end 'IsIdentity',
                    c.Data_Type 'Type'
                    from 
                            information_schema.tables t 
                            inner join information_schema.columns c on t.table_name = c.table_name
                    where t.table_schema  = :DbName
                    and c.table_schema = :DbName
                `
        };
    }
}


interface IQueryRepo {
    mysql: string;
    mssql: string;
    [Dilect: string]: string;
}

