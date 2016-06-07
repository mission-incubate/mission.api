import { UserRequest, UserResponse, PageContext } from '../../../Common';

export interface IBaseService { }

export class BaseService implements IBaseService {
    public Request: UserRequest<number, string>;
    public constructor(req?: UserRequest<number, string>) {
        this.Request = req;
    }
    public GetResponse<T>(data: T, pageContext?: PageContext): UserResponse<T> {
        return {
            Data: data,
            PageContext: pageContext,
            Error: null
        };
    }
}

export class ServiceFactory {
    public static CreateService<T extends IBaseService>(type: { new (req: UserRequest<number, string>): T },
        req?: UserRequest<number, string>): T {
        return new type(req);
    }
}
