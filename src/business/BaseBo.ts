import {Models, models/*, sequelize*/} from '../models';
import {UserRequest} from '../common';

export interface IBaseBo { }

export class BaseBo implements IBaseBo {
    public Model: Models = models;
    public Request: UserRequest<number, string>;
    public constructor(req: UserRequest<number, string>) {
        this.Request = req;
    }
}

export class BoFactory {
    public static GetBo<T extends IBaseBo>(type: { new (req: UserRequest<number, string>): T }, req: UserRequest<number, string>): T {
        return new type(req);
    }
}
