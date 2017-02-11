
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';
import { Request, Response } from 'express';

import { User, TestUser } from './user.model';
import { UserController } from './user.controller';

const expect = chai.expect;

describe('User Controller', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        res = {
            json: sinon.spy(),
            status: sinon.spy()
        };
    });

    describe('getUsers()', () => {

        let UserMock;
        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves([]);
        });
        afterEach(() => {
            UserMock.restore();
        });

        it('calls res.json()', (done) => {
            UserController.getUsers(req, res, function () {
                UserMock.verify();
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            let resObj = {success: true, payload: []};

            UserController.getUsers(req, res, function () {
                UserMock.verify();
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });
    });

    describe('getSingleUser()', () => {
        let UserMock;
        let superman = {
            name: {
                first: 'Clark',
                last: 'Kent'
            },
            email: 'clark@dailyplanet.com',
            local: {
                username: 'superman'
            },
            admin: true,
            createdDate: new Date('2016-09-12')
        };

        beforeEach(() => {
            UserMock = sinon.mock(User);
            UserMock.expects('findById').withArgs('12345')
                .chain('exec')
                .resolves({success: true, payload: superman});
        });

        afterEach(() => {
            UserMock.restore();
        });

        it('calls res.json()', (done) => {
            req = {
                params: {
                    id: '12345'
                }
            };
            UserController.getSingleUser(req, res, function () {
                UserMock.verify();
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with response obj', (done) => {
            let resObj = {success: true, payload: superman};

            req = {
                params: {
                    id: '12345'
                }
            };

            UserController.getSingleUser(req, res, function () {
                UserMock.verify();
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj));
                done();
            });
        });

    });

    describe('addUser()', () => {
        beforeEach(() => {
            UserController.setModel(TestUser);
            req.body = {
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

        afterEach(() => {
            TestUser.collection.drop();
            UserController.setModel(User);
        });

        it('calls res.json()', (done) => {
            UserController.addUser(req, res, function () {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });
    });
});
