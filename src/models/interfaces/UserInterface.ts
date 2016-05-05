import {Instance} from 'sequelize';

export interface UserAttributes {
    Id: string;
    Rev: number;
    Title: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Age: string;
    DOB: string;
    PreferredLanguage: string;
    Qualification: string;
    Nationality: string;
    Category: string;
    DoctorShareClass: string;
    ActionFrom: string;
    ActionTo: string;
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
    LicenseIssueDate: string;
    LicenseExpiryDate: string;
    IsAdmittingConsultant: string;
    IsVisistingConsultant: string;
    IsSurgeon: string;
    Image: string;
    Signature: string;
    UserName: string;
    Password: string;
    TabletAccess: string;
    MobileAccess: string;
    LoginPermission: string;
}

export interface UserInstance extends Instance<UserAttributes> {
    // I'm exposing every DB column as an instance field to so that tsc won't complain.
    // CreatedAt: Date;
    // UpdatedAt: Date;
    Data: UserAttributes;

}
