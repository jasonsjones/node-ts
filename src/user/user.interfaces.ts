import { Document } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    admin?: boolean;
}

interface IUserModel extends IUser, Document {
    // custom methods for model would go here
}

export { IUser, IUserModel }
