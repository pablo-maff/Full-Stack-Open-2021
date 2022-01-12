import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stats = (props) => {
  const sumAll = props.clicks.good + props.clicks.neutral + props.clicks.bad
  const avgScore = (props.clicks.good - props.clicks.bad) / sumAll
  const positivePerc = props.clicks.good / sumAll * 100 + ' %'
  return  (
  <>
    <h1>statistics</h1>
    good {props.clicks.good}<br />
    neutral {props.clicks.neutral}<br />
    bad {props.clicks.bad}<br />
    all {sumAll}<br />
    average {avgScore}<br />
    positive {positivePerc}
  </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })
 
  const handleGoodClick = () => 
    setClicks({ ...clicks, good: clicks.good + 1})

  const handleNeutralClick = () => 
    setClicks({ ...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () => 
    setClicks({ ...clicks, bad: clicks.bad + 1})

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Stats clicks ={clicks} />
    </>
  )
}

export default App