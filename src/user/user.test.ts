import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Route', () => {

    it('should be json', () => {
        chai.request(app)
            .get('/users')
            .then((res) => {
                expect(res.type).to.eql('application/json');
            })
            .catch((err) => {
                throw err;
            });
    });

});
