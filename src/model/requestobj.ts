export class PageContext {
    public PageSize: number;
    public PageNumber: number;
    public TotalRecords: number;
}

export class UserContext {
    public Id: number;
}

export class Param<Tk, Tv>{
    constructor(tk: string, tv: string) {
        this.Tk = tk;
        this.Tv = tv;
    }
    public Tk: string;
    public Tv: string;
}

export class BaseRequest {
    public Id: number;
    public UserContext: UserContext;
}

export class Request<Tk, Tv> extends BaseRequest {
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
export class Response<T extends IBaseDto>{
    public PageContext: PageContext;
    public Error: Error;
    public Data: T;
}

