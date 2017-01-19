import * as mongoose from 'mongoose';
import { DbEnv } from './enums';

import config from './config';

class DbManager {
    private static _dockerInstance: DbManager;
    private connection: mongoose.Connection;

    private constructor(env: DbEnv) {
        (<any>mongoose).Promise = global.Promise;
        if (env === DbEnv.DOCKER) {
            this.connectToDockerDb();
            this.initHandlers();
        }
    }

    public static getInstance(env: DbEnv): DbManager {
        if (env === DbEnv.DOCKER) {
            if (!DbManager._dockerInstance) {
                DbManager._dockerInstance = new DbManager(env);
            }
            return DbManager._dockerInstance;
        } else {
            throw new Error('Error: Cannot get non-docker instance');
        }
    }

    public getConnection(): mongoose.Connection {
        if (this.connection) {
            return this.connection;
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
