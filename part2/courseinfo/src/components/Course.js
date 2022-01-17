import React from 'react'

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

export default Course