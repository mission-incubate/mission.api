export interface IAudit {
    CreatedDate?: Date;
    ModifiedDate?: Date;
    CreatedBy?: number;
    ModifiedBy?: number;
}

export interface IAttributes extends IAudit {
    Id?: number;
    Rev?: number;
    Status?: number;
}
