import * as mocha from 'mocha';
import * as chai from 'chai';

import { DbEnv } from '../common/enums';
import { DbManager } from './dbmanager';

const expect = chai.expect;

describe('DbManager', () => {
    describe('getInstance()', () => {
        it('returns an instance of DbManager', () => {
            let dbmanager = DbManager.getInstance(DbEnv.DOCKER);
            expect(dbmanager).to.be.instanceOf(DbManager);
        });

        it('returns a singleton of DbManager', () => {
            let dbmanagerA = DbManager.getInstance(DbEnv.DOCKER);
            let dbmanagerB = DbManager.getInstance(DbEnv.DOCKER);

            expect(dbmanagerA).to.be.instanceOf(DbManager);
            expect(dbmanagerB).to.be.instanceOf(DbManager);
            expect(dbmanagerA).to.equal(dbmanagerB, 'instances should be equal');
        });

        it('gets different connections for dev and test', () => {
            let connectionA = DbManager.getInstance(DbEnv.DOCKER).getConnection();
            let connectionB = DbManager.getInstance(DbEnv.DOCKER).getTestConnection();

            expect(connectionA).to.not.equal(connectionB);
        });
    });
});
