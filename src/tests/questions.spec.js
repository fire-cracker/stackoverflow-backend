import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import User from '../database/models/users';
import Question from '../database/models/questions'
import {
    createUser, invalidUserToken } from './mocks/users.mock';
import { createQuestion, incorrectQuestionDetails } from './mocks/questions.mock';

chai.use(chaiHttp);

let userToken;

describe('Tests for questions', () => {
    before(async () => {
        await User.deleteMany({});
        await Question.deleteMany({});

        const { body: { data: { accessToken } } } = await chai.request(app)
        .post('/users')
        .send(createUser);
      userToken = accessToken;
    });

    describe('Tests for create questions', () => {
        it('should create question if request is correct', async () => {
            const res = await chai.request(app)
                .post('/questions')
                .set('Authorization', `${userToken}`)
                .send(createQuestion);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .and.to.have.property('question')
                .that.includes.all.keys('_id', 'title', 'body', 'userId')
        });

        it('should return error if request to create question is incorrect', async () => {
            const res = await chai.request(app)
                .post('/questions')
                .set('Authorization', `${userToken}`)
                .send(incorrectQuestionDetails);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .that.includes.all.keys([
                    'message', 'field'
                ]);
        });

        it('should return error if user token is invalid', async () => {
            const res = await chai.request(app)
                .post('/questions')
                .set('Authorization', `${invalidUserToken}`)
                .send(createQuestion);
            expect(res).to.have.status(401);
        });
    });

    describe('Tests for get all questions', () => {
        it('should get all questions if request is correct', async () => {
            const res = await chai.request(app)
                .get('/questions')
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('questions', 'questions_count')
                .and.to.have.property('questions')
                .and.to.be.an.instanceof(Array)
                .and.to.have.length.greaterThan(0)
        });
    });
});
