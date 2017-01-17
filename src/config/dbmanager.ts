import * as mongoose from 'mongoose';
import { DbEnv } from './enums';

import config from './config';

class DbManager {

    private connection: mongoose.Connection;

    constructor(env: DbEnv) {
        (<any>mongoose).Promise = global.Promise;
        if (env === DbEnv.DOCKER) {
            this.connectToDockerDb();
            this.initHandlers();
        } else {
            console.log('Mongodb not install on local machine');
        }
    }

    private initHandlers(): void {
        console.log('Initializing db handlers...');

        this.connection.once('open', () => {
            console.log('Connected to mongo container...');
        });

        this.connection.on('error', console.error.bind(console, 'connection error'));
    }

    private connectToDockerDb(): void {
        mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`);
        this.connection = mongoose.connection;
    }
}

export default DbManager;
