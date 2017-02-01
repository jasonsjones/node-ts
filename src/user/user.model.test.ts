import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import { TestUser as User } from './user.model';

const expect = chai.expect;

describe('User Model', () => {

    describe('save()', () => {

        let mockUserData;
        let mockUser;
        before(() => {
            mockUserData = {
                name: {
                    firstName: 'Oliver',
                    lastName: 'Queen'
                },
                email: 'oliver@queenconsolidated.com',
                local: {
                    username: 'arrow',
                    password: 'p@ssw0rd'
                }
            };
        });
        beforeEach(() => {
            mockUser = new User(mockUserData);
        });

        afterEach(() => {
            User.collection.drop();
        });

        it('does not return an error', (done) => {
            mockUser.save(function (err, user) {
                expect(err).to.not.exist;
                done();
            });
        });

        it('adds admin property as false by default', (done) => {
            mockUser.save(function (err, user) {
                expect(err).to.not.exist;
                expect(user.admin).to.be.false;
                done();
            });
        });

        it('adds createdDate property by default', (done) => {
            mockUser.save(function (err, user) {
                expect(err).to.not.exist;
                expect(user.createdDate).to.exist;
                done();
            });
        });

        it('stores a hashed password', (done) => {
            mockUser.save(function (err, user) {
                expect(err).to.not.exist;
                expect(user.local.password).to.not.equal(mockUserData.local.password);
                done();
            });
        });
    });

    describe('verifyPassword()', () => {
        let mockUserData;
        let mockUser;
        before((done) => {
            mockUserData = {
                name: {
                    firstName: 'Oliver',
                    lastName: 'Queen'
                },
                email: 'oliver@queenconsolidated.com',
                local: {
                    username: 'arrow',
                    password: 'p@ssw0rd'
                }
            };
            mockUser = new User(mockUserData);
            mockUser.save(function () {
                done();
            });
        });

        after(() => {
            User.collection.drop();
        });

        it('returns false with the wrong password', () => {
            let result = mockUser.verifyPassword('wrongP@ssword');
            expect(result).to.be.false;
        });

        it('returns true with the correct password', () => {
            let result = mockUser.verifyPassword('p@ssw0rd');
            expect(result).to.be.true;
        });
    });
});
