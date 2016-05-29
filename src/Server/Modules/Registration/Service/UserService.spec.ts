import {UserService} from './UserService';
import {UserRequest, PageContext} from '../../../Common';

describe('User Service', () => {
    let userService: UserService = new UserService();

    // beforeEach(() => {  });
    it('FindById', async (done) => {
        let req = new UserRequest();
        req.Id = 1;
        await userService.FindById(req);
        done();
    });
    it('GetAllUsers', async (done) => {
        let req = new UserRequest();
        req.PageContext = new PageContext();
        req.PageContext.PageSize = 5;
        req.PageContext.PageNumber = 1;
        await userService.GetAllUsers(req);
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
        let req = new UserRequest();
        req.Data = data;
        let response = await userService.AddUser(req);
        req = new UserRequest();
        req.Id = response.Data;
        console.log(req.Id);
        let getRes = await userService.FindById(req);
        expect(data.Rev).toEqual(getRes.Data.dataValues.Rev);
        done();
    });
});

