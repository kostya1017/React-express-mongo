import React from 'react';

// Individual radio button for question
const QuestonChoice = ({ onChange, checked, choice }) => {
  return (
    <div className="radio">
      <label>
        <input type="radio" name="answer" onChange={onChange} checked={checked} value={choice._id} required />
        {choice.text}
      </label>
    </div>
  );
};

export default QuestonChoice;
