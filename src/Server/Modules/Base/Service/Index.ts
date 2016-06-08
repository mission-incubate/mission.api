import { ApiRequest, ApiResponse, PageContext } from '../../../Common';

export interface IBaseService { }

export class BaseService implements IBaseService {
    public Request: ApiRequest<number, string>;
    public constructor(req?: ApiRequest<number, string>) {
        this.Request = req;
    }
    public GetResponse<T>(data: T, pageContext?: PageContext): ApiResponse<T> {
        return {
            Data: data,
            PageContext: pageContext,
            Error: null
        };
    }
}

export class ServiceFactory {
    public static CreateService<T extends IBaseService>(type: { new (req: ApiRequest<number, string>): T },
        req?: ApiRequest<number, string>): T {
        return new type(req);
    }
}
