import { Schema } from 'mongoose';

class UserSchema {
    private schema: Schema;

    constructor() {
        this.defineSchema();
    }

    defineSchema(): void {
        this.schema = new Schema({
            name: String,
            email: String,
            admin: Boolean
        });
    }

    getSchema(): Schema {
        return this.schema;
    }
}

export default new UserSchema().getSchema();
