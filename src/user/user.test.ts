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

        it('returns json with success property that is a boolean', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('returns json with payload property that is an array', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.body).to.have.property('payload').that.is.an('array');
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('GET /users/:id', () => {
        it('is json', () => {
            chai.request(app)
                .get('/users/589694486fb62f007da7306b') // superman id
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('returns json with success property that is a boolean', () => {
            chai.request(app)
                .get('/users/589694486fb62f007da7306b') // superman id
                .then((res) => {
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('returns json with payload property that is an object', () => {
            chai.request(app)
                .get('/users/589694486fb62f007da7306b') // superman id
                .then((res) => {
                    expect(res.body).to.have.property('payload').that.is.an('object');
                })
                .catch((err) => {
                    throw err;
                });
        });

    });

});
