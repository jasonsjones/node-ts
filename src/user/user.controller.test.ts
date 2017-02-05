
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
    let req: Request;
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

    describe.skip('seedUsers()', () => {

        let UserMock;
        beforeEach(() => {
            UserMock = sinon.mock(User);
        });

        it('calls res.json()', (done) => {
            let resObj = {success: true, message: 'seeding users in database'};
            let stub = sinon.stub(UserController, 'createUsers');
            stub.returns(Promise.resolve(resObj));
            UserController.seedUsers(req, res, function() {
                expect(res.json.calledOnce).to.be.true;
                stub.restore();
                done();
            });
        });

        it('calls res.json() with message when db is empty', (done) => {
            let resObj = {success: true, message: 'seeding users in database'};

            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves([]);

            let stub = sinon.stub(UserController, 'createUsers');
            stub.returns(Promise.resolve(resObj));

            UserController.seedUsers(req, res, function() {
                UserMock.verify();
                UserMock.restore();
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                stub.restore();
                done();
            });
        });

        it('calls res.json() with users when db is not empty', (done) => {
            let testUser = {name: 'jason'};
            let resObj = {success: true, payload: testUser};

            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves(testUser);

            UserController.seedUsers(req, res, function() {
                UserMock.verify();
                UserMock.restore();
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

    });



});
