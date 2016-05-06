import { AppConfig } from '../config/config';

export class PageContext {
    public PageSize: number;
    public PageNumber: number;
    public TotalRecords: number;
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
}

export class UserContext {
    public Id: number;
}

export class Param<Tk, Tv>{
    public Tk: string;
    public Tv: string;
    public constructor(tk: string, tv: string) {
        this.Tk = tk;
        this.Tv = tv;
    }
}

export class BaseRequest {
    public Id: number;
    public UserContext: UserContext;
    public Data: any;
}

export class UserRequest<Tk, Tv> extends BaseRequest {
    public PageContext: PageContext;
    public Params: Param<Tk, Tv>[];

    public Add(param: Param<Tk, Tv>): void;
    public Add(tk: string, tv: string): void;
    public Add(arg1: any, arg2?: string): void {
        if (typeof arg1 === 'Param<Tk, Tv>') {
            this.Params.push(arg1);
        } else if (typeof arg1 === 'string' && typeof arg2 === 'string') {
            this.Params.push(new Param<Tk, Tv>(arg1, arg2));
        }
    }
}

export interface IBaseDto { }

export class Error {
    public Code: string;
    public Message: string;
}
export class UserResponse<T extends IBaseDto>{
    public PageContext: PageContext;
    public Error: Error;
    public Data: T;
}
