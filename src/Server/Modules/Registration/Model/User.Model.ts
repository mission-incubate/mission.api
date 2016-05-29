import * as SequelizeStatic from 'sequelize';
import {DataTypes, Sequelize} from 'sequelize';
import * as i from './interface';


export default function (sequelize: Sequelize, DataTypes: DataTypes):
    SequelizeStatic.Model<i.UserInstance, i.UserAttributes> {
    let User = sequelize.define<i.UserInstance, i.UserAttributes>('User', {
        Id: {
            type: DataTypes.BIGINT,
            field: 'Id',
            primaryKey: true,
            autoIncrement: true
        },
        Rev: { type: DataTypes.BIGINT, field: 'Rev' },
        Title: { type: DataTypes.STRING, field: 'Title' },
        FirstName: { type: DataTypes.STRING, field: 'FirstName' },
        MiddleName: { type: DataTypes.STRING, field: 'MiddleName' },
        LastName: { type: DataTypes.STRING, field: 'LastName' },
        Age: { type: DataTypes.INTEGER, field: 'Age' },
        DOB: { type: DataTypes.DATE, field: 'DOB' },
        PreferredLanguage: { type: DataTypes.STRING, field: 'PreferredLanguage' },
        Qualification: { type: DataTypes.STRING, field: 'Qualification' },
        Nationality: { type: DataTypes.STRING, field: 'Nationality' },
        Category: { type: DataTypes.STRING, field: 'Category' },
        DoctorShareClass: { type: DataTypes.STRING, field: 'DoctorShareClass' },
        ActionFrom: { type: DataTypes.DATE, field: 'ActionFrom' },
        ActionTo: { type: DataTypes.DATE, field: 'ActionTo' },
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
        LicenseIssueDate: { type: DataTypes.DATE, field: 'LicenseIssueDate' },
        LicenseExpiryDate: { type: DataTypes.DATE, field: 'LicenseExpiryDate' },
        IsAdmittingConsultant: { type: DataTypes.BOOLEAN, field: 'IsAdmittingConsultant' },
        IsVisistingConsultant: { type: DataTypes.BOOLEAN, field: 'IsVisistingConsultant' },
        IsSurgeon: { type: DataTypes.BOOLEAN, field: 'IsSurgeon' },
        Image: { type: DataTypes.BLOB, field: 'Image' },
        Signature: { type: DataTypes.BLOB, field: 'Signature' },
        UserName: { type: DataTypes.STRING, field: 'UserName' },
        Password: { type: DataTypes.STRING, field: 'Password' },
        TabletAccess: { type: DataTypes.BOOLEAN, field: 'TabletAccess' },
        MobileAccess: { type: DataTypes.BOOLEAN, field: 'MobileAccess' },
        LoginPermission: { type: DataTypes.BOOLEAN, field: 'LoginPermission' }
    },
        {
            indexes: [],
            classMethods: {},
            timestamps: true,
            tableName: 'User',
            createdAt: 'CreatedAt',
            updatedAt: 'UpdatedAt',
            freezeTableName: true
        });

    return User;
}
