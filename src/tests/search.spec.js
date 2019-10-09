import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import User from '../database/models/users';
import Question from '../database/models/questions'
import Answer from '../database/models/answers';
import Votes from '../database/models/votes';
import {
    createUser, createUser2
} from './mocks/users.mock';
import {
    createQuestion
} from './mocks/questions.mock';
import {
    createAnswer
} from './mocks/answers.mock';

chai.use(chaiHttp);

let userToken;
let userToken2;
let questionId;

describe('Tests for questions', () => {
    before(async () => {
        await User.deleteMany({});
        await Question.deleteMany({});
        await Votes.deleteMany({});
        await Answer.deleteMany({});

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

        await chai.request(app)
            .post(`/questions/${questionId}/answers`)
            .set('Authorization', `${userToken2}`)
            .send(createAnswer);

    });

    describe('Tests for search questions', () => {
        it('should return search result for search by question param if question exist', async () => {
            const res = await chai.request(app)
                .get('/search?question=talk');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.property('result')
                .and.to.be.an.instanceof(Array)
        });

        it('should return search result for search by user param if question exist', async () => {
            const res = await chai.request(app)
                .get('/search?user=peace');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.property('result')
                .and.to.be.an.instanceof(Array)
        });

        it('should return search result for search by answer param if question exist', async () => {
            const res = await chai.request(app)
                .get('/search?answer=love');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.property('result')
                .and.to.be.an.instanceof(Array)
        });

        it('should notify user if search result is not found ', async () => {
            const res = await chai.request(app)
                .get('/search?question=dump');
            expect(res).to.have.status(404);
            expect(res.body).to.be.an.instanceof(Object)
                .that.includes.all.keys('status', 'data')
                .and.to.have.property('data')
                .and.to.have.deep.property('message')
                .and.to.equal('No Question was found');
        });
    });
});