import { Model } from 'mongoose';
import { IUserModel } from '../user/user.interfaces';

export interface IModel {
    user: Model<IUserModel>;
}
