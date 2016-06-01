import React from 'react';

const HighScoreTableHeadRow = ({ noCols }) => (
  <tr>
    <th>Name</th>
    {Array(noCols).fill().map((_, i) => (
      <th key={i}>Q{i + 1}</th>
    ))}
    <th>Total</th>
  </tr>
);

const HighScoreTableRow = ({ highScore }) => (
  <tr>
    <th scope="row">{highScore.name}</th>
    {highScore.answers.map((answer, i) => (
      <td key={i}>{answer.choice.points}</td>
    ))}
    <td>{highScore.total}</td>
  </tr>
);

const HighScoreTable = ({ highScores }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <HighScoreTableHeadRow noCols={highScores[0].answers.length} />
      </thead>
      <tbody>
        {highScores.map((highScore, i) => (
          <HighScoreTableRow key={i} highScore={highScore} />
        ))}
      </tbody>
    </table>
  </div>
);

export default HighScoreTable;
