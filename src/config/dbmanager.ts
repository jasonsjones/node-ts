const debug = require('debug')('node-ts:dbmanager');

import * as mongoose from 'mongoose';
import { DbEnv } from '../common/enums';

import config from './config';

export class DbManager {

    private static _dockerInstance: DbManager;
    private static devConnection: mongoose.Connection;
    private static testConnection: mongoose.Connection;

    private devDbUri: string;
    private testDbUri: string;

    private constructor(env: DbEnv) {
        (<any>mongoose).Promise = global.Promise;
        if (env === DbEnv.DOCKER) {
            debug('Creating new DbManager instance...');
            this.devDbUri = `mongodb://${config.db.dev.host}/${config.db.dev.name}`;
            this.testDbUri = `mongodb://${config.db.test.host}/${config.db.test.name}`;
            this.connectToDockerDb();
            this.connectToDockerTestDb();
            this.initHandlers(DbManager.devConnection, 'dev db');
            this.initHandlers(DbManager.testConnection, 'test db');
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
        if (DbManager.devConnection) {
            return DbManager.devConnection;
        }
    }

    public getTestConnection(): mongoose.Connection {
        if (DbManager.testConnection) {
            return DbManager.testConnection;
        }
    }

    private connectToDockerDb(): void {
        if (!DbManager.devConnection) {
            DbManager.devConnection = mongoose.createConnection(this.devDbUri);
        }
    }

    private connectToDockerTestDb(): void {
        if (!DbManager.testConnection) {
            DbManager.testConnection = mongoose.createConnection(this.testDbUri);
        }
    }

    private initHandlers(conn: mongoose.Connection, dbName: string): void {
        process.removeAllListeners('SIGINT').removeAllListeners('SIGUSR2');

        conn.once('open', () => {
            debug(`Mongoose connected to mongo container ${dbName}`);
        });

        conn.on('error', console.error.bind(console, 'connection error'));

        conn.on('disconnected', () => {
            debug(`Mongoose ${dbName} disconnected`);
        });

        process.once('SIGUSR2', () => {
            this.gracefulShutdown('nodemon restart', conn, () => {
                process.kill(process.pid, 'SIGUSR2');
            });
        });

        process.once('SIGINT', () => {
            this.gracefulShutdown('app termination', conn, () => {
                process.exit(0);
            });
        });
    }

    private gracefulShutdown(msg: string, conn: mongoose.Connection, cb: () => void): void {
        conn.close(() => {
            debug(`Mongoose disconnected through ${msg}`);
            cb();
        });
    }
}
