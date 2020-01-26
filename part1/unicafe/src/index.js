import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Total = ({ rating, value }) => {
    return (<div>{rating} {value}</div>)
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

    const handleGoodClick = () => {
        console.log('clicked good')
        setGood(good + 1)
    }
    const handleNeutralClick = () => {
        console.log('clicked neutral')
        setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
        console.log('clicked bad')
        setBad(bad + 1)
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
            <div>
                <Total rating="good" value={good} />
                <Total rating="neutral" value={neutral} />
                <Total rating="bad" value={bad} />
            </div>
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)