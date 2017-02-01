import * as bcrypt from 'bcrypt-nodejs';
import { Schema, Model } from 'mongoose';
import { DbManager } from '../config/dbmanager';
import { DbEnv } from '../common/enums';
import { IModel } from '../common/model';
import { IUserModel } from './user.interfaces';

class UserSchema {
    static readonly SALT_WORK_FACTOR = 10;
    private schema: Schema;

    constructor() {
        this.defineSchema();
        this.setupPreHooks();
        this.setupMethods();
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

    private setupPreHooks(): void {
        this.schema.pre('save', function (next) {
            let user = this;

            // early return if the password is not modified
            if (!user.isModified('local.password')) {
                return next();
            }

            // the password has changed so we need to hash it before saving
            bcrypt.genSalt(UserSchema.SALT_WORK_FACTOR, function (err, salt) {
                if (err) {
                    return next(err);
                }

                bcrypt.hash(user.local.password, salt, null, function (err, hash) {
                    if (err) {
                        return next(err);
                    }

                    user.local.password = hash;
                    next();
                });
            });
        });
    }

    private setupMethods(): void {
        this.schema.methods.verifyPassword = function (password) {
            return bcrypt.compareSync(password, this.local.password);
        };
    }
}

export class UserModel {
    private model: IModel;
    private testModel: IModel;
    private manager: DbManager;
    private schema: Schema;

    constructor(schema: Schema) {
        this.manager = DbManager.getInstance(DbEnv.DOCKER);
        this.schema = schema;
        this.initModel();
        this.initTestModel();
    }

    private initModel(): void {
        this.model = Object();
        let connection = this.manager.getConnection();
        try {
            this.model.user = connection.model<IUserModel>('User');
        } catch (e) {
            if (e.name === 'MissingSchemaError') {
                this.model.user = connection.model<IUserModel>('User', this.schema);
            }
        }
    }

    private initTestModel(): void {
        this.testModel = Object();
        let connection = this.manager.getTestConnection();
        try {
            this.testModel.user = connection.model<IUserModel>('User');
        } catch (e) {
            if (e.name === 'MissingSchemaError') {
                this.testModel.user = connection.model<IUserModel>('User', this.schema);
            }
        }
    }

    public getModel(): IModel {
        return this.model;
    }

    public getTestModel(): IModel {
        return this.testModel;
    }
}

let userSchema: Schema = new UserSchema().getSchema();
export const User: Model<IUserModel> = new UserModel(userSchema).getModel().user;
export const TestUser: Model<IUserModel> = new UserModel(userSchema).getTestModel().user;
