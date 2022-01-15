import React, { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]

const points = new Array(anecdotes.length).fill(0)
const copy = [...points]

const App = () => {

  const [selected, setSelected] = useState(0)
  
  
  console.log('points=',points)
  console.log('copy1=', copy)

  
  const handleNextAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  const handleVotes = () => {
    console.log('copy=', copy)
    copy[selected] += 1
  }
  
  return (
    <>
      {anecdotes[selected]}<br />
      <Button onClick={handleVotes} text='vote' />
      <Button onClick={handleNextAnecdote} text='next anecdote' />
    </>
  )
}

export default App