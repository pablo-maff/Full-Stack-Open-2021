/*
Exercise 1.5

Let's take the changes one step further. Change the course and its parts
into a single JavaScript object. Fix everything that breaks.

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      ...
    </div>
  )
}
*/

import React from 'react'

const Header = (props) => <h1>{props.title.name}</h1>

const Content = (props) => {
  return [
          <p>{props.part.parts[0].name} {props.part.parts[0].exercises}</p>,
          <p>{props.part.parts[1].name} {props.part.parts[1].exercises}</p>,
          <p>{props.part.parts[2].name} {props.part.parts[2].exercises}</p>
  ]
}
const Total = (props) => <p>Number of exercises {props.sum.parts[0].exercises + props.sum.parts[1].exercises + props.sum.parts[2].exercises}</p>


const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
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
}

  return (
    <>
      <Header title={course} />
      <Content part={course} />
      <Total sum={course}/>
    </>
  )
}

export default App