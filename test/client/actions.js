import { expect } from 'chai';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';
import { setName, resetResponse, addAnswer, removeAnswer, saveResponse } from '../../src/client/actions/response';
import { getQuestions } from '../../src/client/actions/questions';
import { getHighScores } from '../../src/client/actions/highScores';

describe('actions', () => {
  let mockStore;
  before(() => {
    mockStore = configureMockStore([thunk]);
  });
  describe('answers', () => {
    it('#setName should dispatch SET_NAME with specified name', () => {
      const name = 'Chris';
      const expectedAction = { type: 'SET_NAME', name };
      expect(setName(name)).to.deep.equal(expectedAction);
    });
    it('#resetResponse should dispatch RESET_RESPONSE', () => {
      const expectedAction = { type: 'RESET_RESPONSE' };
      expect(resetResponse()).to.deep.equal(expectedAction);
    });
    it('#addAnswer should dispatch ADD_ANSWER with answer details', () => {
      const answer = { question: '34353', choice: '321424', points: 15 };
      const expectedAction = { type: 'ADD_ANSWER', answer };
      expect(addAnswer('34353', '321424', 15)).to.deep.equal(expectedAction);
    });
    it('#removeAnswer should dispatch REMOVE_ANSWER with index of answer to remove', () => {
      const expectedAction = { type: 'REMOVE_ANSWER', index: 1 };
      expect(removeAnswer(1)).to.deep.equal(expectedAction);
    });
    it('#saveResponse should dispatch SAVE_RESPONSE + SAVE_RESPONSE_FAIL when saving response fails', done => {
      nock('http://localhost')
        .post('/api/responses', { name: 'hi', answers: [] })
        .reply(500, { message: 'Internal Server Error' });
      const expectedActions = [
        { type: 'SAVE_RESPONSE' },
        { type: 'SAVE_RESPONSE_FAIL', error: { message: 'Internal Server Error' } },
      ];
      const state = { response: Immutable.fromJS({ name: 'hi', answers: [] })};
      const store = mockStore(state, expectedActions, done);
      store.dispatch(saveResponse());
    });
    it('#saveResponse should dispatch SAVE_RESPONSE + SAVE_RESPONSE_SUCCESS when saving response succeeds', done => {
      nock('http://localhost')
        .post('/api/responses', { name: 'hi', answers: [] })
        .reply(200, { id: '23232', name: 'hi', answers: [] });
      const expectedActions = [
        { type: 'SAVE_RESPONSE' },
        { type: 'SAVE_RESPONSE_SUCCESS' },
      ];
      const state = { response: Immutable.fromJS({ name: 'hi', answers: [] })};
      const store = mockStore(state, expectedActions, done);
      store.dispatch(saveResponse());
    });
  });
  describe('questions', () => {
    it('#getQuestions should dispatch GET_QUESTIONS + GET_QUESTIONS_FAIL when fetching questions fail', done => {
      nock('http://localhost')
        .get('/api/questions')
        .reply(500, { message: 'Internal Server Error' });
      const expectedActions = [
        { type: 'GET_QUESTIONS' },
        { type: 'GET_QUESTIONS_FAIL', error: { message: 'Internal Server Error' } },
      ];
      const store = mockStore({}, expectedActions, done);
      store.dispatch(getQuestions());
    });
    it('#getQuestions should dispatch GET_QUESTIONS + GET_QUESTIONS_SUCCESS when fetching questions succeeds', done => {
      nock('http://localhost')
        .get('/api/questions')
        .reply(200, [{ _id: '21414', text: 'question', choices: [] }]);
      const expectedActions = [
        { type: 'GET_QUESTIONS' },
        { type: 'GET_QUESTIONS_SUCCESS', questions: [{ _id: '21414', text: 'question', choices: [] }] },
      ];
      const store = mockStore({}, expectedActions, done);
      store.dispatch(getQuestions());
    });
  });
  describe('highScores', () => {
    it('#getHighScores should dispatch GET_HIGH_SCORES and GET_QUESTIONS_FAIL when fetching highscores fails', done => {
      nock('http://localhost')
        .get('/api/responses/high-scores')
        .reply(500, { message: 'Internal Server Error' })
      const expectedActions = [
        { type: 'GET_HIGH_SCORES' },
        { type: 'GET_HIGH_SCORES_FAIL', error: { message: 'Internal Server Error' } },
      ];
      const store = mockStore({}, expectedActions, done);
      store.dispatch(getHighScores());
    })
  })
});
