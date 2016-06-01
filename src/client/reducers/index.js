import { combineReducers } from 'redux';
import response from './response';
import questions from './questions';
import highScores from './highScores';

const rootReducer = combineReducers({
  response,
  questions,
  highScores,
});

export default rootReducer;
