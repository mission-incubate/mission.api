import { AppConfig } from '../../Config';

export interface PageContext {
    PageSize?: number;
    PageNumber?: number;
    TotalRecords?: number;
}

export class Paginator {
    private pc: PageContext;
    constructor(pc: PageContext) {
        this.pc = pc ? pc : { PageSize: AppConfig.DefaultPageSize, PageNumber: 1 };
    }
    public get Limit(): number {
        return this.pc.PageSize > 0 ? this.pc.PageSize : AppConfig.DefaultPageSize;
    };

    public get Offset(): number {
        return this.pc.PageNumber > 0 ? (this.pc.PageNumber - 1) * this.pc.PageSize : 0;
    };
    public NextPage(): void {
        this.pc.PageNumber += 1;
    }
}

export class UserContext {
    public Id: number;
}
