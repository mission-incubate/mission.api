import { AppConfig } from '../config';

export class PageContext {
    public PageSize: number;
    public PageNumber: number;
    public TotalRecords: number;
    constructor(context?: PageContext) {
        if (context) {
            this.PageSize = context.PageSize;
            this.PageNumber = context.PageNumber;
            this.TotalRecords = context.TotalRecords;
        }
    }
    // public get Limit(): number {
    //     return this.PageSize === 0 ? AppConfig.DefaultPageSize : this.PageSize;
    // };

    // public get Offset(): number {
    //     return (this.PageNumber - 1) * this.PageSize;
    // };
    public GetLimit(): number {
        return this.PageSize === 0 ? AppConfig.DefaultPageSize : this.PageSize;
    };

    public GetOffset(): number {
        return (this.PageNumber - 1) * this.PageSize;
    };

    public NextPage(): void {
        this.PageNumber += 1;
    }
}

export class UserContext {
    public Id: number;
}
