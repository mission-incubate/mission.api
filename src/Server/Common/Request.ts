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

export class Param<Tk> {
    public Key: Tk;
    public Value: any;
    public SearchType: SearchType;
    public OrderBy: OrderBy;
}

export interface IRequest { }

export class BaseRequest implements IRequest {
    public Id: number;
    public UserContext: UserContext;
    public Data: any;
}

export class ApiRequest<Tk extends ISearchEnums> extends BaseRequest {
    public PageContext: PageContext;
    public Params: Param<Tk>[];
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
    public Request: IRequest;
    public constructor(route: string, request: ApiRequest<ISearchEnums>) {
        this.Route = route;
        this.Request = request;
    }
}
