
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

        it('calls res.json()', () => {
            UserController.getUsers(req, res);
            expect(res.json.calledOnce).to.be.true;
        });

        it('calls res.json() with message', () => {
            let resObj = {message: 'Getting all users...'};

            UserController.getUsers(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.calledWith(resObj)).to.be.true;
        });
    });

    describe('seedUsers()', () => {

        it('calls res.json()', (done) => {
            UserController.seedUsers(req, res, function() {
                expect(res.json.calledOnce).to.be.true;
                done();
            });
        });

        it('calls res.json() with message when db is empty', (done) => {
            let resObj = {message: 'seeding users in database'};
            let UserMock = sinon.mock(User);

            UserMock.expects('find').withArgs({})
                .chain('exec')
                .resolves([]);

            UserController.seedUsers(req, res, function() {
                UserMock.verify();
                UserMock.restore();
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.calledWith(resObj)).to.be.true;
                done();
            });
        });

        it('calls res.json() with users when db is not empty');

    });



});
