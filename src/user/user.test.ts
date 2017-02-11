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
                    console.log('Catch Error: ' + err);
                });
        });

        it('returns json with success property that is a boolean', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                });
        });

        it('returns json with payload property that is an array', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.body).to.have.property('payload').that.is.an('array');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                });
        });
    });

    describe('GET /users/:id', () => {
        let firstUserId;
        before(() => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    firstUserId = res.body.payload[0]._id;
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                });
        });

        it('is json', () => {
            chai.request(app)
                .get('/users/' + firstUserId)
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                });
        });

        it('returns json with success property that is a boolean', () => {
            chai.request(app)
                .get('/users/' + firstUserId)
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                    expect(res.body).to.have.property('success').that.is.eql(true);
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                });
        });

        it('returns json with payload property that is an object', () => {
            chai.request(app)
                .get('/users/589e9e5ca8191700221b6a7c') // superman id
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                    expect(res.body).to.have.property('payload').that.is.an('object');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                });
        });

    });

});
