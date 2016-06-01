import request from 'superagent';

export const GET_HIGH_SCORES = 'GET_HIGH_SCORES';
export const GET_HIGH_SCORES_SUCCESS = 'GET_HIGH_SCORES_SUCCESS';
export const GET_HIGH_SCORES_FAIL = 'GET_HIGH_SCORES_FAIL';

// Fetches high scores from server
export function getHighScores() {
  return dispatch => {
    dispatch({ type: GET_HIGH_SCORES });
    return request.get('/api/responses/high-scores')
      .end((err, res) => {
        if (err) return dispatch({ type: GET_HIGH_SCORES_FAIL, error: err.response.body });
        return dispatch({ type: GET_HIGH_SCORES_SUCCESS, highScores: res.body });
      });
  };
}
