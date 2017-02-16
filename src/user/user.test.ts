import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../config/app';

import { User, TestUser } from './user.model';
import { UserController } from './user.controller';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Route', () => {

    let userIdToDelete;

    describe('GET /users', () => {

        it('is json', () => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
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
                    expect(err).to.be.null;
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
                    expect(err).to.be.null;
                });
        });
    });

    describe('POST /users', () => {
        let dig = {
            email: 'dig@queenconsolidated.com',
            admin: false,
            local: {
                username: 'spartan',
                password: 'p@ssw0rd'
            },
            name: {
                first: 'John',
                last: 'Diggle'
            }
        };

        before(() => {
            UserController.setModel(TestUser);
        });

        after(() => {
            UserController.setModel(User);
        });

        it('adds a user to the db', () => {
            chai.request(app)
                .post('/users')
                .send(dig)
                .then(res => {
                    expect(res.type).to.eql('application/json');
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                    expect(res.body).to.have.property('payload').that.is.an('object');
                    userIdToDelete = res.body.payload._id;
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
                });
        });
    });

    describe('GET /users/:id', () => {
        let firstUserId;
        before((done) => {
            chai.request(app)
                .get('/users')
                .then((res) => {
                    firstUserId = res.body.payload[0]._id;
                    done();
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
                });
        });

        it('is json', () => {
            chai.request(app)
                .get(`/users/${firstUserId}`)
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
                });
        });

        it('returns json with success property that is a boolean', () => {
            chai.request(app)
                .get(`/users/${firstUserId}`)
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                    expect(res.body).to.have.property('success').that.is.a('boolean');
                    expect(res.body).to.have.property('success').that.is.eql(true);
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
                });
        });

        it('returns json with payload property that is an object', () => {
            chai.request(app)
                .get(`/users/${firstUserId}`)
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                    expect(res.body).to.have.property('payload').that.is.an('object');
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
                });
        });

        it('returns json when user is not found', () => {
            chai.request(app)
                .get('/users/58a3d89b41c59d006d7cb4d7')
                .then((res) => {
                    expect(res.type).to.eql('application/json');
                    expect(res.body).to.have.property('success').that.is.eql(false);
                    expect(res.body).to.have.property('message').that.is.a('string');
                    expect(res.body).to.have.property('payload').that.is.null;
                })
                .catch((err) => {
                    console.log('Catch Error: ' + err);
                    expect(err).to.be.null;
                });
        });
    });

});
