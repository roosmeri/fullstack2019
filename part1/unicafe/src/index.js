import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Positive = ({ good, all }) => {
    const pos_ratio = good / all
    if (isNaN(pos_ratio)) {
        return (
            <div>positive %</div>
        )
    }
    return (
        <div>positive {pos_ratio} %</div>
    )
}

const Average = ({ good, bad, all }) => {
    const avg = (good + bad * (-1)) / all
    if (isNaN(avg)) {
        return (
            <div>average</div>
        )
    }
    return (
        <div>average {avg}</div>
    )
}

const Total = ({ rating, value }) => {
    return (<div>{rating} {value}</div>)
}

const StatisticLine = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad, all }) => {
    if(all==0) {
        return (<div>No feedback given</div>)
    }
    const pos = good/all
    return (
        <div>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={(good+bad*(-1))/all} />
            <StatisticLine text="positive" value={[pos,"%"].join(" ")} />
        </div>)
}

const Button = ({ text, handler }) => {
    return (
        <button onClick={handler}>
            {text}
        </button>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleGoodClick = () => {
        console.log('clicked good')
        setGood(good + 1)
        setAll(all + 1)
    }
    const handleNeutralClick = () => {
        console.log('clicked neutral')
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBadClick = () => {
        console.log('clicked bad')
        setBad(bad + 1)
        setAll(all + 1)
    }

    return (
        <>
            <h2>give feedback</h2>
            <div>
                <Button text="good" handler={handleGoodClick} />
                <Button text="neutral" handler={handleNeutralClick} />
                <Button text="bad" handler={handleBadClick} />
            </div>
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)