import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';
import { saveResponse } from '../actions/response';

/**
 * Results of quiz
 */
class Results extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(saveResponse());
  }

  render() {
    const response = this.props.response.toJS();
    return (
      <div>
        <h3>Thank you {response.name} </h3>
        <p>You scored {response.score} out of a possible {response.total} in the cash flow quiz</p>
        <Link to="/high-scores" className="btn btn-primary btn-lg" disabled={response.saving}>High Scores</Link>
      </div>
    );
  }
}

Results.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answers: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default Results;
