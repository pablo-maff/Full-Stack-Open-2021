/*
Exercise 1.2

Refactor the Content component so that it does not render any names
of parts or their number of exercises by itself. Instead it only
renders three Part components of which each renders the name and
number of exercises of one part.
*/

import React from 'react'

const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const Header = (props) => <h1>{props.title}</h1>

const Part = (props) => <p>{props.part} {props.exercise}</p>

const Content = () => {
  return (
    <>
      <Part part={part1} exercise={exercises1}/>
      <Part part={part2} exercise={exercises2}/>
      <Part part={part3} exercise={exercises3}/>
    </>
  ) 
}

const Total = (props) => <p>Number of exercises {props.sum}</p>

const App = () => {
  const course = 'Half Stack Application Development'

  return (
    <>
      <Header title={course} />
      <Content />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App