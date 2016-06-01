import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { Question, Response } from '../../src/server/models';
import { start } from '../../src/server';

describe('api', () => {
  let server;
  before(() => {
    server = start('test');
  });
  beforeEach(done => {
    const choices = [
      { text: 'choice 1', points: 15 },
      { text: 'choice 2', points: 10 },
    ];
    const questions = [
      { text: 'question no 1', choices },
      { text: 'question no 2', choices }
    ];
    Question.create(questions).then(() => done()).catch(done);
  });
  afterEach(done => {
    mongoose.connection.db.dropDatabase().then(() => done());
  });
  after(done => {
    mongoose.connection.close(() => {
      server.close(done);
    });
  });
  it('GET /questions should return all questions', (done) => {
    request(server)
      .get('/api/questions')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.exist;
        expect(res.body).to.have.length(2);
        res.body.map(question => {
          expect(question).to.have.all.keys('_id', 'text', 'choices');
          expect(question.choices).to.have.length(2);
          question.choices.map(choice => expect(choice).to.have.all.keys('_id', 'text', 'points'));
        });
        done();
      });
  });
  it('POST /responses should add new response to db', (done) => {
    Question.find({}).then(questions => {
      const response = {
        name: 'Chris',
        answers: [
          { question: questions[0]._id, choice: questions[0].choices[0]._id },
          { question: questions[1]._id, choice: questions[1].choices[1]._id },
        ],
      };
      request(server)
        .post('/api/responses')
        .send(response)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.exist;
          expect(res.body).to.have.all.keys('_id', 'name', 'answers');
          expect(res.body.name).to.equal('Chris');
          expect(res.body.answers).to.have.length(2);
          res.body.answers.map(answer => expect(answer).to.have.all.keys('_id', 'question', 'choice'));
          expect(res.body.answers[0].question.text).to.equal('question no 1');
          expect(res.body.answers[0].question.choices).to.have.length(2);
          expect(res.body.answers[1].question.text).to.equal('question no 2');
          expect(res.body.answers[1].question.choices).to.have.length(2);
          expect(res.body.answers[0].choice).to.deep.equal({ _id: questions[0].choices[0]._id.toString(), text: 'choice 1', points: 15 });
          expect(res.body.answers[1].choice).to.deep.equal({ _id: questions[1].choices[1]._id.toString(), text: 'choice 2', points: 10 });
          Response.findOne({ name: 'Chris' })
            .then(resp => {
              expect(resp).to.exist;
              done();
            });
        });
    });
  });
  it('GET /responses/high-scores should return top 5 responses with highest total', (done) => {
    Question.find({}).then(questions => {
      const responses = [
        {
          name: 'Tom',
          answers: [
            { question: questions[0], choice: questions[0].choices[1] },
            { question: questions[1], choice: questions[1].choices[1] },
          ],
        },
        {
          name: 'Chris',
          answers: [
            { question: questions[0], choice: questions[0].choices[0] },
            { question: questions[1], choice: questions[1].choices[0] },
          ],
        },
      ];
      return Response.create(responses);
    })
    .then(() => {
      request(server)
        .get('/api/responses/high-scores')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.exist;
          expect(res.body).to.have.length(2);
          res.body.map(response => {
            expect(response).to.have.all.keys('_id', 'name', 'answers', 'total');
            expect(response.answers).to.have.length(2);
            response.answers.map(answer => expect(answer).to.have.all.keys('_id', 'question', 'choice'));
          });
          expect(res.body[0].name).to.equal('Chris');
          expect(res.body[0].total).to.equal(30)
          expect(res.body[1].name).to.equal('Tom');
          expect(res.body[1].total).to.equal(20)
          done();
        });
    });
  });
});
