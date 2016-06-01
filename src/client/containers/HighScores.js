import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Immutable from 'immutable';
import { getHighScores } from '../actions/highScores';
import HighScoreTable from '../components/HighScoreTable';

/**
 * Quiz high score
 */
class HighScores extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Fetch high scores
    this.props.dispatch(getHighScores());
  }

  render() {
    const highScores = this.props.highScores.toJS();
    if (!highScores.length) return null;
    return (
      <div>
        <h3>High Scores</h3>
        <HighScoreTable highScores={highScores} />
        <div style={{ textAlign: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">Try Again</Link>
        </div>
      </div>
    );
  }
}

HighScores.propTypes = {
  dispatch: PropTypes.func.isRequired,
  highScores: PropTypes.instanceOf(Immutable.List).isRequired,
};

function mapStateToProps(state) {
  return {
    highScores: state.highScores,
  };
}

export default connect(mapStateToProps)(HighScores);
