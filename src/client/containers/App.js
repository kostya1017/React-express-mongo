import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import NavBar from '../components/NavBar';

/**
 * App - wraps all other components
 */
class App extends Component {
  render() {
    // Display current score only on question route
    const isQuestionRoute = this.props.routes[this.props.routes.length - 1].path === 'questions/:id';
    return (
      <div className="container" style={{ maxWidth: '800px', marginTop: '20px' }}>
        {isQuestionRoute && <NavBar score={this.props.response.get('score')} /> || <NavBar />}
        <div className="row">
          <div className="col-md-12">
            {React.cloneElement(this.props.children, this.props)}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  response: PropTypes.instanceOf(Immutable.Map()).isRequired,
};

function mapStateToProps(state) {
  return {
    response: state.response,
  };
}

export default connect(mapStateToProps)(App);
