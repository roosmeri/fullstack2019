import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = () => {
  const state = store.getState()
  var sum = 0;

  for (var key in state) {
    sum += parseInt(state[key]);
  }

  if (sum === 0) {
    return (<div>No feedback given</div>)
  }
  const pos = state.good / sum
  return (
    <table>
      <tbody>

        <StatisticLine text="good" value={state.good} />
        <StatisticLine text="neutral" value={state.ok} />
        <StatisticLine text="bad" value={state.bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={(state.good + state.bad * (-1)) / sum} />
        <StatisticLine text="positive" value={[pos, "%"].join(" ")} />

      </tbody>
    </table>)
}


const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>hyvä</button>
      <button onClick={ok}>neutraali</button>
      <button onClick={bad}>huono</button>
      <button onClick={reset}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali</div>
      <div>huono</div>
      <h2>statistics</h2>
      <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)