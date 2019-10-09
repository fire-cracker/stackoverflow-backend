import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import User from '../database/models/users';
import Question from '../database/models/questions'
import Answer from '../database/models/answers';
import Votes from '../database/models/votes';
import {
    createUser,
    userDetails, incorrectCreateUserDetails, loginUser,
    incorrectloginPassword, loginUserWrongEmail, incorrectloginDetails
} from './mocks/users.mock';

chai.use(chaiHttp);

describe('Tests for users', () => {
    before(async () => {
        await User.deleteMany({});
        await Question.deleteMany({});
        await Votes.deleteMany({});
        await Answer.deleteMany({});
    });

    describe('Tests for create users', () => {
        it('should create user if request is correct', async () => {
            const res = await chai.request(app)
                .post('/users')
                .send(createUser);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('user', 'accessToken', 'expires_in')
                .and.to.have.property('user')
                .that.includes.all.keys(userDetails);
        });

        it('should return error if request to create user is incorrect', async () => {
            const res = await chai.request(app)
                .post('/users')
                .send(incorrectCreateUserDetails);
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
                .send(createUser);
            expect(res).to.have.status(409);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('User with this email already exist.');
        });
    });

    describe('Tests for login User', () => {
        it('should login user if request is correct', async () => {
            const res = await chai.request(app)
                .post('/users/login')
                .send(loginUser);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('user', 'accessToken', 'expires_in')
                .and.to.have.property('user')
                .that.includes.all.keys(userDetails);
        });

        it('should return error if user password is incorrect', async () => {
            const res = await chai.request(app)
                .post('/users/login')
                .send(incorrectloginPassword);
            expect(res).to.have.status(404);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('Provide correct login credentials');
        });

        it('should return error if user email does not exist', async () => {
            const res = await chai.request(app)
                .post('/users/login')
                .send(loginUserWrongEmail);
            expect(res).to.have.status(404);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('Email does not exist');
        });

        it('should return error if request to login user is incorrect', async () => {
            const res = await chai.request(app)
                .post('/users/login')
                .send(incorrectloginDetails);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .that.includes.all.keys([
                    'message', 'field'
                ]);
        });
    });
});
