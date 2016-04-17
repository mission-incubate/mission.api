import { Dal } from '../dal/index';
import { DB} from '../appsettings';
import { User} from '../model/user';

//export namespace Mission.BO {
export interface IBaseBO {

}

export class BaseBO implements IBaseBO {

}

export class UserBO extends BaseBO {
    public GetUserById(id: number): Promise<User[]> {
        let dal = this.GetDal();
        let outVal: Promise<User[]>;
        dal.Connect()
            .then(() => {
                outVal = dal.ExecuteQuery<User>('select top 5 Id , Name, City  from [users] ');
            });
        return outVal;
    }

    public GetAllUsers(): Promise<User[]> {
        var dal = this.GetDal();
        let outVal: Promise<User[]>;
        dal.Connect()
            .then(() => {
                outVal = dal.ExecuteQuery<User>('select Id, Name, City from [users]');
            });
        return outVal;
    }

    private GetDal(): Dal {
        return new Dal(DB, false);
    }
}
//}
