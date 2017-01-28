import { Document } from 'mongoose';

interface IFullName {
    firstName: string;
    lastName: string;
}

interface ILocalCredentials {
    username: string;
    password: string;
}

interface IUser {
    name: IFullName;
    email: string;
    local: ILocalCredentials;
    admin?: boolean;
}

interface IUserModel extends IUser, Document {
    // custom methods for model would go here
}

export { IUser, IUserModel }
