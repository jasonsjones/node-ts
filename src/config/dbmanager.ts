import * as mongoose from 'mongoose';
import { DbEnv } from '../common/enums';

import config from './config';

export class DbManager {

    private static _dockerInstance: DbManager;
    private static connection: mongoose.Connection;

    private dbUri: string;

    private constructor(env: DbEnv) {
        (<any>mongoose).Promise = global.Promise;
        if (env === DbEnv.DOCKER) {
            console.log('Creating new DbManager instance...');
            this.dbUri = `mongodb://${config.db.host}/${config.db.name}`;
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
        if (DbManager.connection) {
            return DbManager.connection;
        }
    }

    private connectToDockerDb(): void {
        if (!DbManager.connection) {
            DbManager.connection = mongoose.createConnection(this.dbUri);
        }
    }

    private initHandlers(): void {
        if (DbManager.connection) {
            process.removeAllListeners('SIGINT').removeAllListeners('SIGUSR2');

            DbManager.connection.once('open', () => {
                console.log('Mongoose connected to mongo container at ' + this.dbUri);
            });

            DbManager.connection.on('error', console.error.bind(console, 'connection error'));

            DbManager.connection.on('disconnected', () => {
                console.log('Mongoose disconnected');
            });

            process.once('SIGUSR2', () => {
                this.gracefulShutdown('nodemon restart', () => {
                    process.kill(process.pid, 'SIGUSR2');
                });
            });

            process.once('SIGINT', () => {
                this.gracefulShutdown('app termination', () => {
                    process.exit(0);
                });
            });
        }
    }

    private gracefulShutdown(msg: string, cb: () => void): void {
        DbManager.connection.close(() => {
            console.log('Mongoose disconnected through ' + msg);
            cb();
        });
    }
}
