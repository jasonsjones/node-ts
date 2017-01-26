
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';

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

    it('getUsers() makes a call to res.json()', () => {
        UserController.getUsers(req, res);
        expect(res.json.calledOnce).to.be.true;
    });

    it('getUsers() calls res.json() with message', () => {
        let resObj = {message: 'Getting all users...'};

        UserController.getUsers(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith(resObj)).to.be.true;
    });

});
