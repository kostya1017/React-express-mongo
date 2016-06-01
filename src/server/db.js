import mongoose from 'mongoose';
import { Question } from './models';
import questions from '../../questions.json';

/**
 * Initializes db with questions from questions.json
 */
export function init() {
  const db = mongoose.connect('mongodb://localhost/quiz').connection;
  mongoose.Promise = Promise;
  db.once('open', () => {
    const promises = questions.map(question => Question.create(question));
    Promise.all(promises).then(() => console.log('DONE')).catch(err => console.error(err));
  });
}
