import {Models, models/*, sequelize*/} from '../models';

export interface IBaseBo { }

export class BaseBo implements IBaseBo {
    public Model: Models = models;
}

export class BoFactory {
    public static GetBo<T extends IBaseBo>(type: { new (): T }): T {
        return new type();
    }
}
