import {PageContext} from './Contexts';
import {IBaseDto} from './Misc';

export interface IResponse { }

export class Error {
    public Code: string;
    public Message: string;
}

export class UserResponse<T extends IBaseDto> implements IResponse {
    public PageContext: PageContext;
    public Error: Error;
    public Data: T;
}

