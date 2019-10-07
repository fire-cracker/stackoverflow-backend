import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import User from '../database/models/users';
import {
    registerCustomer,
    customerdetails, incorrectCustomerRegistration
} from './mocks/users.mock';

chai.use(chaiHttp);

describe('Tests for users', () => {
    before(async () => {
        await User.deleteMany({});
    });

    describe('Tests for create users', () => {
        it('should create user if request is correct', async() => {
           const res = await chai.request(app)
            .post('/users')
            .send(registerCustomer);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an.instanceof(Object)
            .and.to.have.property('data')
            .that.includes.all.keys('user', 'accessToken', 'expires_in')
            .and.to.have.property('user')
            .that.includes.all.keys(customerdetails);
        });

        it('should return error if request to create user is incorrect', async () => {
            const res = await chai.request(app)
                .post('/users')
                .send(incorrectCustomerRegistration);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .that.includes.all.keys([
                    'message', 'field'
                ]);
        });

        it('should return error if user already exist', async () => {
            const res = await chai.request(app)
                .post('/users')
                .send(registerCustomer);
            expect(res).to.have.status(409);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('User with this email already exist.');
        });
    });
});
