/*
Exercise 1.3

Let's move forward to using objects in our application.
Modify the variable definitions of the App component as follows
and also refactor the application so that it still works:

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      ...
    </div>
  )
}
*/

import React from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises}</p>
}
const Total = (props) => {
  return <p>Number of exercises {props.sum}</p>
}

const App = () => {
  const course = 'Half Stack Application Development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header title={course} />
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
      <Total sum={part1.exercises + part2.exercises + part3.exercises}/>
    </>
  )
}

export default App