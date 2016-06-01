import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import Immutable from 'immutable';
import response from '../../src/client/reducers/response';
import questions, { getCurrentQuestion, isLastQuestion } from '../../src/client/reducers/questions';
import highScores from '../../src/client/reducers/highScores';
import { SET_NAME, ADD_ANSWER, REMOVE_ANSWER, SAVE_RESPONSE, SAVE_RESPONSE_SUCCESS, RESET_RESPONSE } from '../../src/client/actions/response';
import { GET_QUESTIONS_SUCCESS } from '../../src/client/actions/questions';
import { GET_HIGH_SCORES_SUCCESS } from '../../src/client/actions/highScores';

chai.use(chaiImmutable);

describe('reducers', () => {
  describe('response', () => {
    it('Should return initial state', () => {
      const state = response(undefined, {});
      const expected = Immutable.fromJS({
        name: null,
        total: 0,
        score: 0,
        saving: false,
        answers: [],
      });
      expect(state).to.equal(expected);
    });
    it('Should set name when action is SET_NAME', () => {
      const action = {
        type: SET_NAME,
        name: 'Chris',
      };
      const state = response(undefined, action);
      const expected = Immutable.fromJS({
        name: 'Chris',
        total: 0,
        score: 0,
        saving: false,
        answers: [],
      });
      expect(state).to.equal(expected);
    });
    it('Should add answer to list + update score if action is ADD_ANSWER', () => {
      const action = {
        type: ADD_ANSWER,
        answer: { question: '1312', choice: '123', points: 10 },
      };
      const state = response(undefined, action);
      const expected = Immutable.fromJS({
        name: null,
        total: 0,
        score: 10,
        saving: false,
        answers: [{ question: '1312', choice: '123', points: 10 }],
      });
      expect(state).to.equal(expected);
    });
    it('Should remove answer from list + update score if action is REMOVE_ANSWER', () => {
      const action = {
        type: REMOVE_ANSWER,
        index: 0,
      };
      const initialState = Immutable.fromJS({
        name: 'Chris',
        score: 15,
        total: 100,
        saving: false,
        answers: [{ question: '123', choice: '1', points: 15 }],
      })
      const state = response(initialState, action);
      const expected = Immutable.fromJS({
        name: 'Chris',
        score: 0,
        total: 100,
        saving: false,
        answers: [],
      });
      expect(state).to.equal(expected);
    });
    it('Should calculate total points when action is GET_QUESTIONS_SUCCESS', () => {
      const questions = [
        {_id: '1', text: 'q1', choices: [{ _id: '2', text: 'c1', points: 10 }, { _id: '2', text: 'c2', points: 15 }]},
        {_id: '4', text: 'q2', choices: [{ _id: '7', text: 'c1', points: 10 }, { _id: '8', text: 'c2', points: 0 }]},
      ];
      const action = {
        type: GET_QUESTIONS_SUCCESS,
        questions,
      };
      const state = response(undefined, action);
      const expected = Immutable.fromJS({
        name: null,
        score: 0,
        total: 25,
        saving: false,
        answers: [],
      });
      expect(state).to.equal(expected);
    });
    it('Should set saving to true when action is SAVE_RESPONSE', () => {
      const action = {
        type: SAVE_RESPONSE,
      };
      const state = response(undefined, action);
      const expected = Immutable.fromJS({
        name: null,
        total: 0,
        score: 0,
        saving: true,
        answers: [],
      });
      expect(state).to.equal(expected);
    });
    it('Should set saving to false when action is SAVE_RESPONSE_SUCCESS', () => {
      const action = {
        type: SAVE_RESPONSE_SUCCESS,
      };
      const initialState = Immutable.fromJS({
        name: null,
        total: 0,
        score: 0,
        saving: true,
        answers: [],
      });
      const state = response(initialState, action);
      const expected = Immutable.fromJS({
        name: null,
        total: 0,
        score: 0,
        saving: false,
        answers: [],
      });
      expect(state).to.equal(expected);
    });
    it('Should reset to initial state when action is RESET_RESPONSE', () => {
      const action = {
        type: RESET_RESPONSE,
      };
      const initialState = Immutable.fromJS({
        name: 'Chris',
        total: 100,
        score: 50,
        saving: true,
        answers: [{ key: 'VAL' }],
      });
      const state = response(initialState, action);
      const expected = Immutable.fromJS({
        name: null,
        total: 0,
        score: 0,
        saving: false,
        answers: [],
      });
      expect(state).to.equal(expected);
    })
  });
  describe('questions', () => {
    it('Should return initial state', () => {
      const state = questions(undefined, {});
      const expected = Immutable.List();
      expect(state).to.equal(expected);
    });
    it('Should return list of questions when action is GET_QUESTIONS_SUCCESS', () => {
      const action = {
        type: GET_QUESTIONS_SUCCESS,
        questions: [{ _id: '1243', text: 'A question', choices: [{ _id: '1313', text: 'Choice', points: 10 }] }]
      };
      const state = questions(undefined, action);
      const expected = Immutable.fromJS([{ _id: '1243', text: 'A question', choices: [{ _id: '1313', text: 'Choice', points: 10 }] }]);
      expect(state).to.equal(expected);
    });
    it('#getCurrentQuestion should return empty map if index doesnt exist', () => {
      const currentQuestion = getCurrentQuestion(Immutable.List(), 0);
      expect(currentQuestion).to.equal(Immutable.Map());
    });
    it('#getCurrentQuestion should return current question for index', () => {
      const questionsArr = Immutable.fromJS([{ text: 'q1' }, { text: 'q2' }]);
      const currentQuestion = getCurrentQuestion(questionsArr, 1);
      expect(currentQuestion).to.equal(Immutable.Map({ text: 'q2' }));
    });
    it('#isLastQuestion should return false if index is not last question', () => {
      const questionsArr = Immutable.fromJS([{ text: 'q1' }, { text: 'q2' }]);
      expect(isLastQuestion(questionsArr, 0)).to.be.false;
    });
    it('#isLastQuestion should return true if index is last question', () => {
      const questionsArr = Immutable.fromJS([{ text: 'q1' }, { text: 'q2' }]);
      expect(isLastQuestion(questionsArr, 1)).to.be.true;
    });
  });
  describe('highScores', () => {
    it('Shoudld return initial state', () => {
      const state = highScores(undefined, {});
      const expected = Immutable.List();
      expect(state).to.equal(expected);
    });
    it('Should return list of highScores when action is GET_HIGH_SCORES_SUCCESS', () => {
      const action = {
        type: GET_HIGH_SCORES_SUCCESS,
        highScores: [{ _id: '21224', name: 'Chris', answers: [], total: 100 }]
      }
      const state = highScores(undefined, action);
      const expected = Immutable.fromJS([{ _id: '21224', name: 'Chris', answers: [], total: 100 }]);
      expect(state).to.equal(expected);
    })
  })
});
