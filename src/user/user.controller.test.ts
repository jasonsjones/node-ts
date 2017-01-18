
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';

import * as UserController from './user.controller';

const expect = chai.expect;

describe('User Controller', () => {
    let req: Request;
    let res: any;

    beforeEach(() => {
        res = {
            json: sinon.spy()
        };
    });

    afterEach(() => {
        res.json.restore();
    })

    it('getUsers() makes a call to res.json()');
    it('getUsers() calls res.json() with message');

});
