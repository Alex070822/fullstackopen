import { useState } from 'react'
import Statistics from "./components/Statistics/Statistics";

const App = () => {

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0,
  })

  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1 })
  };

  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 })
  };

  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 })
  };

  const { good, neutral, bad } = clicks;
  const total = good + neutral + bad;

  return (
      <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          handleGoodClick={handleGoodClick}
          handleNeutralClick={handleNeutralClick}
          handleBadClick={handleBadClick}
      />
  )
}

export default App