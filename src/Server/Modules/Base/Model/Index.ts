export interface IAudit {
    CreatedDate: Date;
    ModifiedDate: Date;
    CreatedBy: string;
    ModifiedBy: string;
}

export interface IAttributes extends IAudit {
    Id: number;
}
