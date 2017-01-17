import * as mongoose from 'mongoose';

class UserSchema {
    private schema: mongoose.Schema;

    constructor() {
        this.defineSchema();
    }

    defineSchema(): void {
        this.schema = new mongoose.Schema({
            name: String,
            email: String,
            admin: Boolean
        });
    }

    getSchema(): mongoose.Schema {
        return this.schema;
    }
}

let userSchema = new UserSchema().getSchema();

export default mongoose.model('User', userSchema);
