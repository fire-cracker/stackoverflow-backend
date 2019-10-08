import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import User from '../database/models/users';
import Question from '../database/models/questions'
import {
    createUser, createUser2, invalidUserToken
} from './mocks/users.mock';
import {
    createQuestion, incorrectQuestionDetails, fakeQuestionId, invalidQuestionId
} from './mocks/questions.mock';

chai.use(chaiHttp);

let userToken;
let userToken2;
let questionId;
let questionId2;

describe('Tests for questions', () => {
    before(async () => {
        await User.deleteMany({});
        await Question.deleteMany({});

        const { body: { data: { accessToken } } } = await chai.request(app)
            .post('/users')
            .send(createUser);
        userToken = accessToken;

        const { body: { data: { accessToken: accessToken2 } } } = await chai.request(app)
            .post('/users')
            .send(createUser2);
        userToken2 = accessToken2;

        const { body: { data: { question: { _id } } } } = await chai.request(app)
            .post('/questions')
            .set('Authorization', `${userToken}`)
            .send(createQuestion);
        questionId = _id;

        const { body: { data: { question: { _id: id2 } } } } = await chai.request(app)
            .post('/questions')
            .set('Authorization', `${userToken}`)
            .send(createQuestion);
        questionId2 = id2;

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

    describe('Tests for get a question', () => {
        it('should get a question if request is correct', async () => {
            const res = await chai.request(app)
                .get(`/questions/${questionId}`)
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .that.includes.all.keys('question', 'votes_count')
                .and.to.have.property('question')
                .that.includes.all.keys('_id', 'title', 'body', 'userId', 'user')
                .and.to.have.property('user')
                .that.includes.all.keys('_id', 'name', 'email')
        });

        it('should error if question does not exist', async () => {
            const res = await chai.request(app)
                .get(`/questions/${fakeQuestionId}`)
                expect(res).to.have.status(404);
                expect(res.body).to.be.an.instanceof(Object)
                    .that.includes.all.keys('status', 'data')
                    .and.to.have.property('data')
                    .and.to.have.deep.property('message')
                    .and.to.equal('Question does not exist');
        });
    });

    describe('Tests to upvote and downvote a question', () => {
        it('should upvote a question if request is correct', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/upvote`)
                .set('Authorization', `${userToken2}`)
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('message', 'votes_count')
                .and.to.have.property('message')
                .and.to.equal('You upvoted this question')
            expect(res.body.data.votes_count).to.equal(1)
        });

        it('should notify user if user already upvoted the question', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/upvote`)
                .set('Authorization', `${userToken2}`);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('You already upvoted this question');
        });

        it('should update the question vote to downvote if the user with request to downvote already upvoted', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/downvote`)
                .set('Authorization', `${userToken2}`)
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('message', 'votes_count')
                .and.to.have.property('message')
                .and.to.equal('You downvoted this question')
            expect(res.body.data.votes_count).to.equal(-1)
        });

        it('should downvote a question if request is correct', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId2}/downvote`)
                .set('Authorization', `${userToken2}`)
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('message', 'votes_count')
                .and.to.have.property('message')
                .and.to.equal('You downvoted this question')
            expect(res.body.data.votes_count).to.equal(-1)
        });

        it('should notify user if user already downvoted the question', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/downvote`)
                .set('Authorization', `${userToken2}`);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('You already downvoted this question');
        });

        it('should update the question vote to upvote if the user with request to upvote already downvoted', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId2}/upvote`)
                .set('Authorization', `${userToken2}`)
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .and.to.have.property('data')
                .that.includes.all.keys('message', 'votes_count')
                .and.to.have.property('message')
                .and.to.equal('You upvoted this question')
            expect(res.body.data.votes_count).to.equal(1)
        });

        it('should return error if question to be upvoted does not exist', async () => {
            const res = await chai.request(app)
                .post(`/questions/${fakeQuestionId}/upvote`)
                .set('Authorization', `${userToken2}`);
            expect(res).to.have.status(404);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('Question does not exist');
        });

        it('should return error if question to be downvoted does not exist', async () => {
            const res = await chai.request(app)
                .post(`/questions/${fakeQuestionId}/downvote`)
                .set('Authorization', `${userToken2}`);
            expect(res).to.have.status(404);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('Question does not exist');
        });


        it('should return error if user tries to upvote their question', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/upvote`)
                .set('Authorization', `${userToken}`);
            expect(res).to.have.status(401);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('You cannot vote your question');
        });

        it('should return error if user tries to downvote their question', async () => {
            const res = await chai.request(app)
                .post(`/questions/${questionId}/downvote`)
                .set('Authorization', `${userToken}`);
            expect(res).to.have.status(401);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('You cannot vote your question');
        });

        it('should return error if questionId is invalid', async () => {
            const res = await chai.request(app)
                .post(`/questions/${invalidQuestionId}/upvote`)
                .set('Authorization', `${userToken2}`);
            expect(res).to.have.status(400);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('questionId must be a single string of 12 bytes or 24 hex characters');
        });

    });
});
