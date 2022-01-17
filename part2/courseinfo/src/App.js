import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ course }) => {
  const courseScores = course.map(score => score.exercises)
  const sum = courseScores.reduce((previousValue, currentValue) => previousValue + currentValue)

  return (
    <h4>total of {sum} exercises</h4>
  )
}

const Part = ({ part }) => {
  return (
    <>
      {part.map(name =>
        <p key={name.id}>
          {name.name} {name.exercises}
        </p>
      )}
    </>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course} />
      <Total course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  const courseName = course.map(name => name.name)
  const courseParts = course.map(part => part.parts)

  return <>
    <h1>Web development curriculum</h1>
    <Header course={courseName[0]} />
    <Content course={courseParts[0]} />
    <Header course={courseName[1]} />
    <Content course={courseParts[1]} />

  </>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App