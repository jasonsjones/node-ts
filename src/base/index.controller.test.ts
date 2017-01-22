import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';

import * as IndexController from './index.controller';

const expect = chai.expect;

describe('Index controller', () => {

    let req: Request;
    let res: any;

    beforeEach(() => {
        res = {
            json: sinon.spy()
        };
    });

    afterEach(() => {
    });

    it('getIndex() makes a call to res.json()', () => {

        IndexController.getIndex(req, res);
        expect(res.json.calledOnce).to.be.true;
    });

    it('getIndex() calls res.json() with message', () => {
        let resObj = {message: 'Hello API from typescript!'};

        IndexController.getIndex(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith(resObj)).to.be.true;
    });
});
