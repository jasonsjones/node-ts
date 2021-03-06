import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Base Route', () => {

    it('GET / is json', () => {
        chai.request(app)
            .get('/')
            .then((res) => {
                expect(res.type).to.eql('application/json');
            })
            .catch((err) => {
                console.log('Catch Error: ' + err);
            });
    });

    it('GET / returns json with message property that is a string', () => {
        chai.request(app)
            .get('/')
            .then((res) => {
                expect(res.body).to.have.property('message').that.is.a('string');
            })
            .catch((err) => {
                console.log('Catch Error: ' + err);
            });
    });

});
