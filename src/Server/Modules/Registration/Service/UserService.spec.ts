import {UserService} from './UserService';
import {ApiRequest, PageContext} from '../../../Common';
import {ServiceFactory} from '../../Base/Service';

var log = (err: Error) => {
    console.error(err);
};

describe('User Service', () => {
    //let userService: UserService = new UserService();
    var userService: UserService = ServiceFactory.CreateService(UserService);

    // beforeEach(() => {  });
    it('FindById', async (done) => {
        let req = new ApiRequest();
        req.Id = 1;
        await userService.FindById(req).catch(log);
        done();
    });
    it('GetAllUsers', async (done) => {
        let req = new ApiRequest();
        req.PageContext = new PageContext();
        req.PageContext.PageSize = 5;
        req.PageContext.PageNumber = 1;
        await userService.GetAllUsers(req).catch(log);
        done();
    });
    it('AddUser', async (done) => {
        let data = {
            'Rev': 1,
            'Title': 'Title',
            'FirstName': 'FirstName',
            'MiddleName': 'MiddleName',
            'LastName': 'LastName',
            'Age': 30,
            'PreferredLanguage': 'PreferredLanguage',
            'Qualification': 'Qualification',
            'Nationality': 'Nationality',
            'Category': 'Category',
            'DoctorShareClass': 'DoctorShareClass',
            'AddressLine1': 'AddressLine1',
            'AddressLine2': 'AddressLine2',
            'Pincode': 'Pincode',
            'Area': 'Area',
            'City': 'City',
            'State': 'State',
            'Country': 'Country',
            'LandLine': 'LandLine',
            'Mobile': 'Mobile',
            'Email': 'Email',
            'LicenseNo': 'LicenseNo',
            'UserName': 'UserName',
            'Password': 'Password'
        };
        let req = new ApiRequest();
        req.Data = data;
        let response = await userService.AddUser(req).catch(log);
        req = new ApiRequest();
        req.Id = response.Data;
        console.log(req.Id);
        let getRes = await userService.FindById(req).catch(log);
        expect(data.Rev).toEqual(getRes.Data.dataValues.Rev);
        done();
    });
});
