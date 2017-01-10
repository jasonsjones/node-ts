import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Base Route', () => {

    it('should be json', () => {
        chai.request(app).get('/')
        .then(res => {
            expect(res.type).to.eql('application/json');
        });
    });

    it('should have message property that is a string', () => {
        chai.request(app).get('/')
        .then(res => {
            expect(res).to.have.property('message').that.is.a('string');
        });
    });

});
