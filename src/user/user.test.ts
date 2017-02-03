import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../config/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Route', () => {

    describe('GET /users', () => {

        it('is json', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('returns json with message property that is a string', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.body).to.have.property('message').that.is.a('string');
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe.skip('GET /users/seedUsers', () => {

        it('is json', () => {
            chai.request(app)
                .get('/users/seedUsers')
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('returns json with success property that is a boolean', () => {
            chai.request(app)
                .get('/users/seedUsers')
                .then((res) => {
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

});
