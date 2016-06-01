import Immutable from 'immutable';
import { GET_HIGH_SCORES_SUCCESS } from '../actions/highScores';

const initialState = [];

// Reducer for high score table
function highScores(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {
    case GET_HIGH_SCORES_SUCCESS:
      return Immutable.fromJS(action.highScores);
    default:
      return state;
  }
}

export default highScores;
