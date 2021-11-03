/*
Exercise 1.4

And then place the objects into an array. Modify the variable 
efinitions of App into the following form and modify the
other parts of the application accordingly:

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

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
  const parts = [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]

  return (
    <>
      <Header title={course} />
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
      <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </>
  )
}

export default App