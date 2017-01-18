import * as mongoose from 'mongoose';
import UserSchema from './user.schema';

let model: mongoose.Model<any>;
try {
    model = mongoose.model('User');
} catch (e) {
    if (e.name === 'MissingSchemaError') {
        model = mongoose.model('User', UserSchema);
    }
}

export default model;
