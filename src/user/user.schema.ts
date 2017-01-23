import { Schema } from 'mongoose';

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
            name: String,
            email: String,
            admin: Boolean
        });
    }
}

export default new UserSchema().getSchema();
