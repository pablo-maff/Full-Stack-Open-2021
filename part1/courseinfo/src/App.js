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

NB: at this point you can assume that there are always three items,
so there is no need to go through the arrays using loops.

However, do not pass different objects as separate props from the App component
to the components Content and Total. Instead, pass them directly as an array:

const App = () => {
  // const definitions

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
*/

import React from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Content = (props) => {
  return [
          <p>{props.parts[0].name} {props.parts[0].exercises}</p>,
          <p>{props.parts[1].name} {props.parts[1].exercises}</p>,
          <p>{props.parts[2].name} {props.parts[2].exercises}</p>
  ]
}
const Total = (props) => <p>Number of exercises {props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises}</p>


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
      <Content parts={parts} />
      <Total sum={parts}/>
    </>
  )
}

export default App