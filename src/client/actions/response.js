import request from 'superagent';

export const SET_NAME = 'SET_NAME';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const SAVE_RESPONSE = 'SAVE_RESPONSE';
export const SAVE_RESPONSE_SUCCESS = 'SAVE_RESPONSE_SUCCESS';
export const SAVE_RESPONSE_FAIL = 'SAVE_RESPONSE_FAIL';
export const RESET_RESPONSE = 'RESET_RESPONSE';

export function setName(name) {
  return { type: SET_NAME, name };
}

export function resetResponse() {
  return { type: RESET_RESPONSE };
}

export function addAnswer(question, choice, points) {
  return { type: ADD_ANSWER, answer: { question, choice, points } };
}

export function removeAnswer(index) {
  return { type: REMOVE_ANSWER, index };
}

// Saves quiz response to server
export function saveResponse() {
  return (dispatch, getState) => {
    // Get response from store and remove values we don't need
    const { response } = getState();
    const name = response.get('name');
    const answers = response.toJS().answers.map(({ question, choice }) => ({ question, choice }));
    dispatch({ type: SAVE_RESPONSE });
    return request.post('/api/responses')
      .send({ name, answers })
      .end((err, _) => {
        if (err) return dispatch({ type: SAVE_RESPONSE_FAIL, error: err.response.body });
        dispatch({ type: SAVE_RESPONSE_SUCCESS });
      });
  };
}
