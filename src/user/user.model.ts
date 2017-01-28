import { Schema, Model } from 'mongoose';
import { DbManager } from '../config/dbmanager';
import { DbEnv } from '../common/enums';
import { IModel } from '../common/model';
import { IUserModel } from './user.interfaces';

class UserSchema {
    private schema: Schema;

    constructor() {
        this.defineSchema();
    }

    public getSchema(): Schema {
        return this.schema;
    }

    private defineSchema(): void {
        this.schema = new Schema({
            name: {
                firstName: String,
                lastName: String,
            },
            email: String,
            local: {
                username: String,
                password: String
            },
            admin: {type: Boolean, default: false},
            createdDate: {type: Date, default: Date.now()}
        });
    }
}

export class UserModel {
    private model: IModel;
    private manager: DbManager;
    private schema: Schema;

    constructor(schema: Schema) {
        this.manager = DbManager.getInstance(DbEnv.DOCKER);
        this.schema = schema;
        this.model = Object();
        this.initModel();
    }

    private initModel(): void {
        let connection = this.manager.getConnection();
        try {
            this.model.user = connection.model<IUserModel>('User');
        } catch (e) {
            if (e.name === 'MissingSchemaError') {
                this.model.user = connection.model<IUserModel>('User', this.schema);
            }
        }
    }

    public getModel(): IModel {
        return this.model;
    }
}

let userSchema: Schema = new UserSchema().getSchema();
export const User: Model<IUserModel> = new UserModel(userSchema).getModel().user;
