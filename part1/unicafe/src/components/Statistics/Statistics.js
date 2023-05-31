import React, {useState} from "react";
import Button from "../Button/Button";
import StatisticLine from "../StatisticLine/StatisticLine";

const Statistics = ({ good, neutral, bad, total, handleGoodClick, handleNeutralClick, handleBadClick }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleButtonClick = () => {
    setFeedbackGiven(true);
  };


  return (
      <div>
        <h1>give feedback</h1>
        <Button label="good" onClick={() => { handleGoodClick(); handleButtonClick(); }} />
        <Button label="neutral" onClick={() => { handleNeutralClick(); handleButtonClick(); }} />
        <Button label="bad" onClick={() => { handleBadClick(); handleButtonClick(); }} />
        <h1>statistics</h1>
        {feedbackGiven ? (
            <table>
              <StatisticLine label="good" total={good}/>
              <StatisticLine label="neutral" total={neutral}/>
              <StatisticLine label="bad" total={bad}/>
              <StatisticLine label="all" total={total}/>
              <StatisticLine label="average" total={(good - bad) / total}/>
              <StatisticLine label="positive" total={`${(good * 100) / total} %`}/>
            </table>
        ) : (
            <div>No feedback given</div>
        )}
      </div>
  );
};

export default Statistics;