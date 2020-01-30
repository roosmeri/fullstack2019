import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.ex_amnt}
    </p>
  )
}

const Content = (props) => {
  const content = props.parts.map(part => <Part key={part.name} name={part.name} ex_amnt={part.exercises} />)
  return (
    <>
      {content}
    </>
  )
}

const Total = ({ exercises }) => {
  return (
    <p>Total of exercises {exercises.reduce((a, b) => a + b, 0)}</p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))