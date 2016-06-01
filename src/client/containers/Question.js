import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import QuestonChoice from '../components/QuestionChoice';
import { getCurrentQuestion, isLastQuestion } from '../reducers/questions';
import { getQuestions } from '../actions/questions';
import { addAnswer, removeAnswer } from '../actions/response';

/**
 * Compnent to diplay current question
 */
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { choice: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    // Fetch all questions on mount
    this.props.dispatch(getQuestions());
  }

  componentWillReceiveProps(nextProps) {
    // Remove answer if user presses back button
    if (this.props.params.id > nextProps.params.id) {
      this.props.dispatch(removeAnswer(nextProps.params.id - 1));
    }
  }

  handleChange(e) {
    this.setState({ choice: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const question = this.props.question.toJS();
    const points = question.choices.find((choice) => choice._id === this.state.choice).points;
    // Add answer - then go to next question or results
    this.props.dispatch(addAnswer(question._id, this.state.choice, points));
    const nextQuestion = Number(this.props.params.id) + 1
    if (!this.props.isLastQuestion) {
      this.props.history.pushState(null, '/questions/' + nextQuestion);
    } else {
      this.props.history.pushState(null, '/results');
    }
  }

  render() {
    const question = this.props.question.toJS();
    if (!Object.keys(question).length) return null;
    const btnText = this.props.isLastQuestion ? 'Finish' : 'rrNext';
    return (
      <div style={{borderTopWidth:2}}>
        <h3>{question.text}</h3>
        <form onSubmit={this.handleSubmit}>
          {question.choices.map((choice, i) => {
            return <QuestonChoice key={i} choice={choice} onChange={this.handleChange} checked={choice._id === this.state.choice} />
          })}
          <button className="btn btn-primary btn-lg">{btnText}</button>
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  question: PropTypes.instanceOf(Immutable.Map).isRequired,
  answers: PropTypes.instanceOf(Immutable.Map).isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
};

function mapStateToProps(state, props) {
  // Get current question from questions using url param
  const currentQuestionIndex = props.params.id - 1;
  return {
    question: getCurrentQuestion(state.questions, currentQuestionIndex),
    isLastQuestion: isLastQuestion(state.questions, currentQuestionIndex),
  };
}

export default connect(mapStateToProps)(Question);
