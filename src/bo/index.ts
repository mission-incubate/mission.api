import { Dal } from '../dal/index';
import { DB} from '../appsettings';

export interface IBaseBO {

}

export class BaseBO implements IBaseBO {
    public dal: Dal;
    constructor(dal: Dal) {
        this.dal = dal || this.GetDal();
    }
    private GetDal(): Dal {
        return new Dal(DB);
    }
}

export class BOFactory {
    public static CreateBO<T extends IBaseBO>(type: { new (dal: Dal): T }, dal?: Dal): T {
        return new type(dal);
    }
}
