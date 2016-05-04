import * as sequelize from 'sequelize';
import {Dal} from '../dal/sequelize';
import {SequelizeDb} from '../appsettings';


let User = new Dal(SequelizeDb)
    .GetDal()
    .define('User', {
        Title: {
            type: sequelize.STRING,
            field: 'Title'
        },
        FirstName: {
            type: sequelize.STRING,
            field: 'FirstName'
        },
        MiddleName: {
            type: sequelize.STRING,
            field: 'MiddleName'
        },
        LastName: {
            type: sequelize.STRING,
            field: 'LastName'
        },
        Age: {
            type: sequelize.STRING,
            field: 'Age'
        },
        DOB: {
            type: sequelize.STRING,
            field: 'DOB'
        },
        PreferredLanguage: {
            type: sequelize.STRING,
            field: 'PreferredLanguage'
        },
        Qualification: {
            type: sequelize.STRING,
            field: 'Qualification'
        },
        Nationality: {
            type: sequelize.STRING,
            field: 'Nationality'
        },
        Category: {
            type: sequelize.STRING,
            field: 'Category'
        },
        DoctorShareClass: {
            type: sequelize.STRING,
            field: 'DoctorShareClass'
        },
        ActionFrom: {
            type: sequelize.STRING,
            field: 'ActionFrom'
        },
        ActionTo: {
            type: sequelize.STRING,
            field: 'ActionTo'
        },
        AddressLine1: {
            type: sequelize.STRING,
            field: 'AddressLine1'
        },
        AddressLine2: {
            type: sequelize.STRING,
            field: 'AddressLine2'
        },
        Pincode: {
            type: sequelize.STRING,
            field: 'Pincode'
        },
        Area: {
            type: sequelize.STRING,
            field: 'Area'
        },
        City: {
            type: sequelize.STRING,
            field: 'City'
        },
        State: {
            type: sequelize.STRING,
            field: 'State'
        },
        Country: {
            type: sequelize.STRING,
            field: 'Country'
        },
        LandLine: {
            type: sequelize.STRING,
            field: 'LandLine'
        },
        Mobile: {
            type: sequelize.STRING,
            field: 'Mobile'
        },
        Email: {
            type: sequelize.STRING,
            field: 'Email'
        },
        LicenseNo: {
            type: sequelize.STRING,
            field: 'LicenseNo'
        },
        LicenseIssueDate: {
            type: sequelize.STRING,
            field: 'LicenseIssueDate'
        },
        LicenseExpiryDate: {
            type: sequelize.STRING,
            field: 'LicenseExpiryDate'
        },
        IsAdmittingConsultant: {
            type: sequelize.STRING,
            field: 'IsAdmittingConsultant'
        },
        IsVisistingConsultant: {
            type: sequelize.STRING,
            field: 'IsVisistingConsultant'
        },
        IsSurgeon: {
            type: sequelize.STRING,
            field: 'IsSurgeon'
        },
        Image: {
            type: sequelize.STRING,
            field: 'Image'
        },
        Signature: {
            type: sequelize.STRING,
            field: 'Signature'
        },
        UserName: {
            type: sequelize.STRING,
            field: 'UserName'
        },
        Password: {
            type: sequelize.STRING,
            field: 'Password'
        },
        TabletAccess: {
            type: sequelize.STRING,
            field: 'TabletAccess'
        },
        MobileAccess: {
            type: sequelize.BOOLEAN,
            field: 'MobileAccess'
        },
        LoginPermission: {
            type: sequelize.BOOLEAN,
            field: 'LoginPermission'
        }
    }, {
        timestamps: true
    });

exports = User;