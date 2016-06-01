import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { setName, resetResponse } from '../actions/response';

/**
 * Container for /
 */
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.response.get('name') };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Reset response - so user cant get double points
    this.props.dispatch(resetResponse());
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Set name and go to questions
    this.props.dispatch(setName(this.state.name));
    this.props.history.pushState(null, '/questions/1');
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Welcome to the Cash Flow Quiz</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              type="text" className="form-control input-lg" placeholder="What is your name?"
              required onChange={this.handleChange} value={this.state.name}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary btn-lg">Next</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

Welcome.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  response: PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default Welcome;
