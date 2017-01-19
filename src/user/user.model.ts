import * as mongoose from 'mongoose';
import UserSchema from './user.schema';
import DbManager from '../config/dbmanager';
import { DbEnv } from '../common/enums';
import { IModel } from '../common/model';
import { IUserModel } from './user.interfaces';

export class UserModel {
    private model: IModel;
    private manager: DbManager;

    constructor() {
        this.manager = DbManager.getInstance(DbEnv.DOCKER);
        this.model = Object();
        this.initModel();
    }

    private initModel(): void {
        let connection = this.manager.getConnection();
        try {
            this.model.user = connection.model<IUserModel>('User');
        } catch(e) {
            if (e.name === 'MissingSchemaError') {
                this.model.user = connection.model<IUserModel>('User', UserSchema);
            }
        }
    }

    public getModel(): IModel {
        return this.model;
    }
}
