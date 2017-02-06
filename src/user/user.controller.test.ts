
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';
import { Request, Response } from 'express';

import { User } from './user.model';
import { UserController } from './user.controller';

const expect = chai.expect;

describe('User Controller', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        res = {
            json: sinon.spy()
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
});
