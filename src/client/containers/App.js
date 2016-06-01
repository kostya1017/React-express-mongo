import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
//import NavBar from '../components/NavBar';


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
       
           <h1 className="test" >Welcome to the Cash Flow Quiz</h1>
      
      </div>
    );
  }
}



export default App;
