import { Router } from 'express';
import { Response, Question } from './models';

const api = Router();

/**
 * POST /api/responses - fetches questions and choices + creates new response in db
 */
api.post('/responses', (req, res, next) => {
  const { name, answers } = req.body;
  // Get questions and choices
  const questionIds = answers.map(answer => answer.question);
  Question.find({ _id: { $in: questionIds } })
    .then(questions => {
      return questions.map((question, i) => {
        const choice = question.choices.id(answers[i].choice);
        return { question, choice };
      });
    })
    .then(fullAnswers => Response.create({ name, answers: fullAnswers }))
    .then(response => res.json(response))
    .catch(err => next(err));
});

/**
 * GET /api/responses/high-scores - gets each response total and sorts
 * Returns top 10 high scores
 */
api.get('/responses/high-scores', (req, res, next) => {
  const aggregation = [
    { $project: { _id: 1, name: 1, answers: 1, total: { $sum: '$answers.choice.points' } } },
    { $sort: { total: -1 } },
    { $limit: 10 },
  ];
  Response.aggregate(aggregation).exec()
    .then(responses => res.json(responses))
    .catch(err => next(err));
});

/**
 * GET /api/questions - gets all questions and their choices
 */
api.get('/questions', (req, res, next) => {
  Question.find({})
    .then(questions => res.json(questions))
    .catch(err => next(err));
});

export default api;
