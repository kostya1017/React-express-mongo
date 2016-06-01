import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import NavBar from '../components/NavBar';


//import styles from './App.css';
/**
 * App - wraps all other components
 */
class App extends Component {
  render() {
    // Display current score only on question route
   // const isQuestionRoute = this.props.routes[this.props.routes.length - 1].path === 'questions/:id';
    return (
      <div class="wholepage" id="homepage">
       
            {React.cloneElement(this.props.children, this.props)}
      
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
