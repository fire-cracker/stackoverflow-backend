import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import User from '../database/models/users';
import Question from '../database/models/questions'
import Answer from '../database/models/answers';
import Votes from '../database/models/votes';
import {
    createUser, invalidUserToken
} from './mocks/users.mock';
import {
    createQuestion, fakeQuestionId,
} from './mocks/questions.mock';

import {
    createAnswer, incorrectAnswerDetails
} from './mocks/answers.mock';

chai.use(chaiHttp);

let userToken;
let questionId;

describe('Tests for answers', () => {
    before(async () => {
        await User.deleteMany({});
        await Question.deleteMany({});
        await Votes.deleteMany({});
        await Answer.deleteMany({});

        const { body: { data: { accessToken } } } = await chai.request(app)
            .post('/users')
            .send(createUser);
        userToken = accessToken;

        const { body: { data: { question: { _id } } } } = await chai.request(app)
            .post('/questions')
            .set('Authorization', `${userToken}`)
            .send(createQuestion);
        questionId = _id;

    });

    describe('Tests for create answer', () => {
        it('should create answer if request is correct', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/answers`)
                .set('Authorization', `${userToken}`)
                .send(createAnswer);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .and.to.have.property('answer')
                .that.includes.all.keys('_id', 'questionId', 'body', 'userId')
        });

        it('should return error if question does not exist', async () => {
            const res = await chai.request(app)
                .post(`/questions/${fakeQuestionId}/answers`)
                .set('Authorization', `${userToken}`)
                .send(createAnswer);
            expect(res).to.have.status(404);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('Question does not exist');
        });

        it('should return error if request to create answer is incorrect', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/answers`)
                .set('Authorization', `${userToken}`)
                .send(incorrectAnswerDetails);
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
                .post(`/questions/${questionId}/answers`)
                .set('Authorization', `${invalidUserToken}`)
                .send(createQuestion);
            expect(res).to.have.status(401);
        });
    });
});