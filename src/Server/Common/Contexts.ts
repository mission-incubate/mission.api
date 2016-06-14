import { AppConfig } from '../../Config';

export class PageContext {
    public PageSize: number;
    public PageNumber: number;
    public TotalRecords: number;
    constructor(context?: PageContext) {
        if (context) {
            this.PageSize = context.PageSize;
            this.PageNumber = context.PageNumber;
            this.TotalRecords = context.TotalRecords;
        } else {
            this.PageSize = AppConfig.DefaultPageSize;
            this.PageNumber = 1;
        }
    }
}

export class Paginator {
    private pc: PageContext;
    constructor(pc: PageContext) {
        this.pc = pc ? pc : new PageContext();
    }
    public get Limit(): number {
        return this.pc.PageSize === 0 ? AppConfig.DefaultPageSize : this.pc.PageSize;
    };

    public get Offset(): number {
        return (this.pc.PageNumber - 1) * this.pc.PageSize;
    };
    public NextPage(): void {
        this.pc.PageNumber += 1;
    }
}

export class UserContext {
    public Id: number;
}
