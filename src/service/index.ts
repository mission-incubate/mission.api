import { Response, PageContext } from '../common';

export interface IBaseService { }

export class BaseService implements IBaseService {
    public GetResponse<T>(data: T, pageContext: PageContext): Response<T> {
        return {
            Data: data,
            PageContext: pageContext,
            Error: null
        };
    }
}

export class ServiceFactory {
    public static CreateService<T extends IBaseService>(type: { new (): T }): T {
        return new type();
    }
}
