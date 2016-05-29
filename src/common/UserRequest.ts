import {PageContext, UserContext} from './Contexts';
import {ISearchEnums} from './Misc';

export enum SearchType {
    Contains = 1,
    StartsWith = 2
}

export enum OrderBy {
    ASC = 1,
    DESC = 2
}

export class Param<Tk, Tv>{
    public Tk: string;
    public Tv: string;
    public SearchType: SearchType;
    public OrderBy: OrderBy;
    public constructor(param: Param<Tk, Tv>);
    public constructor(tk: string, tv?: string, st?: SearchType, ob?: OrderBy);
    public constructor(paramORtk: any, tv?: string, st?: SearchType, ob?: OrderBy) {
        if (typeof paramORtk === 'Param<Tk, Tv>') {
            this.Tk = paramORtk.Tk;
            this.Tv = paramORtk.Tv;
            this.SearchType = paramORtk.SearchType;
            this.OrderBy = paramORtk.OrderBy;
        } else {
            this.Tk = paramORtk;
            this.Tv = tv;
            this.SearchType = st;
            this.OrderBy = ob;
        }
    }
}

export interface IRequest { }

export class BaseRequest implements IRequest {
    public Id: number;
    public UserContext: UserContext;
    public Data: any;
}

export class UserRequest<Tk extends ISearchEnums, Tv> extends BaseRequest {
    public PageContext: PageContext;
    public Params: Param<Tk, Tv>[];

    // public Add(param: Param<Tk, Tv>): void;
    // public Add(tk: string, tv: string): void;
    // public Add(arg1: any, arg2?: string): void {
    //     if (typeof arg1 === 'Param<Tk, Tv>') {
    //         this.Params.push(arg1);
    //     } else if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    //         this.Params.push(new Param<Tk, Tv>(arg1, arg2));
    //     }
    // }
}

export class Request implements IRequest {
    public Actions: Array<Action>;
    public constructor() {
        this.Actions = [];
    }
    public Add(action: Action): void {
        this.Actions.push(action);
    }
}

export class Action {
    public Route: string;
    public UserRequest: IRequest;
    public constructor(route: string, userRequest: UserRequest<ISearchEnums, string>) {
        this.Route = route;
        this.UserRequest = userRequest;
    }
}
