import React from 'react'

const Header = ({ text }) => {
    return (
        <h3>{text}</h3>
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

export default Course