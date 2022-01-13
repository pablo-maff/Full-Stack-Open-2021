import React, { useState } from 'react'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Stats = ({ clicks }) => {
  const sumAll = clicks.good + clicks.neutral + clicks.bad
  const avgScore = (clicks.good - clicks.bad) / sumAll
  const positivePerc = clicks.good / sumAll * 100 + ' %'

  if (sumAll === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return  (
  <>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticLine text='good' value={clicks.good} />
        <StatisticLine text='neutral' value={clicks.neutral} />
        <StatisticLine text='bad' value={clicks.bad} />
        <StatisticLine text='all' value={sumAll} />
        <StatisticLine text='average' value={avgScore} />
        <StatisticLine text='positive' value={positivePerc} />
      </tbody>
    </table>
  </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })
 
  // buttons event handling
  const handleGoodClick = () => 
    setClicks({ ...clicks, good: clicks.good + 1})

  const handleNeutralClick = () => 
    setClicks({ ...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () => 
    setClicks({ ...clicks, bad: clicks.bad + 1})

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Stats clicks ={clicks} />
    </>
  )
}

export default App