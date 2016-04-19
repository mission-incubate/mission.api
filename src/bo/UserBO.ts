import { Dal } from '../dal/index';
import { DB} from '../appsettings';
import { User} from '../model/user';

//export namespace Mission.BO {
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

export class UserBO extends BaseBO {
    constructor(dal: Dal) {
        super(dal);
    }

    public GetUserById(id: number): Promise<User[]> {
        let outVal: Promise<User[]>;
        this.dal.Connect()
            .then(() => {
                //TODO: need to add paramter in the request.
                outVal = this.dal.ExecuteQuery<User>('select top 5 Id , Name, City  from [users] where id = @id');
            });
        return outVal;
    }

    public GetAllUsers(): Promise<User[]> {
        let outVal: Promise<User[]>;
        this.dal.Connect()
            .then(() => {
                outVal = this.dal.ExecuteQuery<User>('select Id, Name, City from [users]');
            });
        return outVal;
    }
    public async GetAllUsersAsync(): Promise<User[]> {
        await this.dal.Connect();
        let users = await this.dal.ExecuteQuery<User>('select Id, fullname as Name from [users] where fullname is not null');
        return <User[]>users;
    }
}


export class BOFactory {
    public static CreateBO<T extends IBaseBO>(type: { new (dal: Dal): T }, dal?: Dal): T {
        return new type(dal);
    }
}

//}
