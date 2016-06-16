import {PageContext} from './Contexts';
import {IBaseDto} from './Misc';

export interface IResponse { }

export class Error {
    public Code: string;
    public Message: string;
    public Stack: string;
}

export interface ApiResponse<T extends IBaseDto> extends IResponse {
    PageContext?: PageContext;
    Error?: Error;
    Data: T;
}

