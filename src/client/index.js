import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import configureStore from './store/configureStore';
import App from './containers/App';
import Welcome from './containers/Welcome';
import Question from './containers/Question';
import Results from './containers/Results';
import HighScores from './containers/HighScores';
import NotFound from './components/NotFound';

import 'path';

const store = configureStore();

require('!style!css!./css/fonts.css');
import "./css/bootstrap.min.css";
import "./css/jquery.mCustomScrollbar.min.css";
import "./css/scroll.css";
import "./css/main.css";
import "./css/svg.css";
import "./css/font-awesome.min.css";
//import "https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic";

/**
import "./css/fonts.css";
import "./css/bootstrap.min.css";
import "./css/jquery.mCustomScrollbar.min.css";
import "./css/scroll.css";
import "./css/main.css";
import "./css/svg.css";
import "./css/font-awesome.min.css";

//import "https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic";

/**
    <link rel="stylesheet" type="text/css" href="css/fonts.css">
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css">
	<link rel="stylesheet" type="text/css" href="css/scroll.css">
	<link href="css/main.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="css/svg.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

**/

/**
 * Stops user from accessing questions if they haven't answered previous questions
 * Or if they haven't entered name
 */
function onQuestionEnter(nextState, replaceState) {
  const { response } = store.getState();
  if (!response.toJS().name) {
    replaceState({ nextPathname: nextState.location.pathName }, '/');
  }
  const currentQuestion = response.toJS().answers.length + 1;
  // If url param user wants to access is larger then their currentQuestion then
  // redirect to question they should be on
  if (currentQuestion < Number(nextState.params.id)) {
    replaceState({ nextPathname: nextState.location.pathName }, '/questions/' + currentQuestion);
  }
}

/**
 * Check user has completed quiz before showing results
 */
function onResultsEnter(nextState, replaceState) {
  const { response, questions } = store.getState();
  if (response.get('answers').size === 0 || response.get('answers').size !== questions.size) {
    replaceState({ nextPathname: nextState.location.pathName }, '/');
  }
}

// Render app with routes
render(
  <Provider store={store}>
    <Router history={createHistory()}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="questions/:id" component={Question} onEnter={onQuestionEnter}/>
        
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
