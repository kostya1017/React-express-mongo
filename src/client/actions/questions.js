import request from 'superagent';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAIL = 'GET_QUESTIONS_FAIL';

// Fetches all questions from server
export function getQuestions() {
  return dispatch => {
    dispatch({ type: GET_QUESTIONS });
    return request.get('/api/questions')
      .end((err, res) => {
        if (err) return dispatch({ type: GET_QUESTIONS_FAIL, error: err.response.body });
        return dispatch({ type: GET_QUESTIONS_SUCCESS, questions: res.body });
      });
  };
}
