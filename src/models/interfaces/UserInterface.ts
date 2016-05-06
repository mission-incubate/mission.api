import {Instance} from 'sequelize';

export interface UserAttributes {
    Id: number;
    Rev: number;
    Title: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Age: number;
    DOB: Date;
    PreferredLanguage: string;
    Qualification: string;
    Nationality: string;
    Category: string;
    DoctorShareClass: string;
    ActionFrom: Date;
    ActionTo: Date;
    AddressLine1: string;
    AddressLine2: string;
    Pincode: string;
    Area: string;
    City: string;
    State: string;
    Country: string;
    LandLine: string;
    Mobile: string;
    Email: string;
    LicenseNo: string;
    LicenseIssueDate: Date;
    LicenseExpiryDate: Date;
    IsAdmittingConsultant: boolean;
    IsVisistingConsultant: boolean;
    IsSurgeon: boolean;
    Image: Blob;
    Signature: Blob;
    UserName: string;
    Password: string;
    TabletAccess: boolean;
    MobileAccess: boolean;
    LoginPermission: boolean;
}

export interface UserInstance extends Instance<UserAttributes> {
    // I'm exposing every DB column as an instance field to so that tsc won't complain.
    // CreatedAt: Date;
    // UpdatedAt: Date;
    Data: UserAttributes;

}
