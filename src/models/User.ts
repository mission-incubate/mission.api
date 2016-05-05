import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import { UserAttributes, UserInstance} from './interfaces/UserInterface';


export default function (sequelize: Sequelize, DataTypes: DataTypes):
    SequelizeStatic.Model<UserInstance, UserAttributes> {
    let User = sequelize.define<UserInstance, UserAttributes>('User', {
        Id: { type: DataTypes.STRING, field: 'Id' },
        Rev: { type: DataTypes.STRING, field: 'Ref' },
        Title: { type: DataTypes.STRING, field: 'Title' },
        FirstName: { type: DataTypes.STRING, field: 'FirstName' },
        MiddleName: { type: DataTypes.STRING, field: 'MiddleName' },
        LastName: { type: DataTypes.STRING, field: 'LastName' },
        Age: { type: DataTypes.STRING, field: 'Age' },
        DOB: { type: DataTypes.STRING, field: 'DOB' },
        PreferredLanguage: { type: DataTypes.STRING, field: 'PreferredLanguage' },
        Qualification: { type: DataTypes.STRING, field: 'Qualification' },
        Nationality: { type: DataTypes.STRING, field: 'Nationality' },
        Category: { type: DataTypes.STRING, field: 'Category' },
        DoctorShareClass: { type: DataTypes.STRING, field: 'DoctorShareClass' },
        ActionFrom: { type: DataTypes.STRING, field: 'ActionFrom' },
        ActionTo: { type: DataTypes.STRING, field: 'ActionTo' },
        AddressLine1: { type: DataTypes.STRING, field: 'AddressLine1' },
        AddressLine2: { type: DataTypes.STRING, field: 'AddressLine2' },
        Pincode: { type: DataTypes.STRING, field: 'Pincode' },
        Area: { type: DataTypes.STRING, field: 'Area' },
        City: { type: DataTypes.STRING, field: 'City' },
        State: { type: DataTypes.STRING, field: 'State' },
        Country: { type: DataTypes.STRING, field: 'Country' },
        LandLine: { type: DataTypes.STRING, field: 'LandLine' },
        Mobile: { type: DataTypes.STRING, field: 'Mobile' },
        Email: { type: DataTypes.STRING, field: 'Email' },
        LicenseNo: { type: DataTypes.STRING, field: 'LicenseNo' },
        LicenseIssueDate: { type: DataTypes.STRING, field: 'LicenseIssueDate' },
        LicenseExpiryDate: { type: DataTypes.STRING, field: 'LicenseExpiryDate' },
        IsAdmittingConsultant: { type: DataTypes.STRING, field: 'IsAdmittingConsultant' },
        IsVisistingConsultant: { type: DataTypes.STRING, field: 'IsVisistingConsultant' },
        IsSurgeon: { type: DataTypes.STRING, field: 'IsSurgeon' },
        Image: { type: DataTypes.STRING, field: 'Image' },
        Signature: { type: DataTypes.STRING, field: 'Signature' },
        UserName: { type: DataTypes.STRING, field: 'UserName' },
        Password: { type: DataTypes.STRING, field: 'Password' },
        TabletAccess: { type: DataTypes.STRING, field: 'TabletAccess' },
        MobileAccess: { type: DataTypes.STRING, field: 'MobileAccess' },
        LoginPermission: { type: DataTypes.STRING, field: 'LoginPermission' }
    },
        {
            indexes: [],
            classMethods: {},
            timestamps: true,
            tableName: 'User',
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt'
        });

    return User;
}
