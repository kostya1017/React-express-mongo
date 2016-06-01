import Immutable from 'immutable';
import { SET_NAME, ADD_ANSWER, REMOVE_ANSWER, SAVE_RESPONSE_SUCCESS, SAVE_RESPONSE, RESET_RESPONSE } from '../actions/response';
import { GET_QUESTIONS_SUCCESS } from '../actions/questions';

// Calculates total no of points user could score
function calculatePointsTotal(questions) {
  return questions.reduce((prev, question, index, questionsArr) => {
    const points = question.choices.map(choice => choice.points);
    const largest = Math.max.apply(Math, points);
    return prev + largest;
  }, 0);
}

// Calculates users current score
function calculatePointsScore(answers) {
  return answers.reduce((prev, answer, index, answersArr) => {
    return prev + answer.points;
  }, 0);
}

const initialState = {
  name: null,
  score: 0,
  total: 0,
  saving: false,
  answers: [],
};

// Recucer for users quiz response
function response(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {
    case SET_NAME:
      return state.set('name', Immutable.fromJS(action.name));
    case ADD_ANSWER:
      const newStateAdd = state.set('answers', state.get('answers').push(Immutable.fromJS(action.answer)));
      const answersAdd = newStateAdd.get('answers').toJS();
      return newStateAdd.set('score', calculatePointsScore(answersAdd));
    case REMOVE_ANSWER:
      const newStateRemove = state.set('answers', state.get('answers').delete(action.index))
      const answersRemove = newStateRemove.get('answers').toJS();
      return newStateRemove.set('score', calculatePointsScore(answersRemove));
    case GET_QUESTIONS_SUCCESS:
      const total = calculatePointsTotal(action.questions);
      return state.set('total', total);
    case SAVE_RESPONSE:
      return state.set('saving', true);
    case SAVE_RESPONSE_SUCCESS:
      return state.set('saving', false);
    case RESET_RESPONSE:
      return Immutable.fromJS(initialState);
    default:
      return state;
  }
}

export default response;
