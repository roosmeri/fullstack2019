import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

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

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={ok}>neutraali</button> 
      <button onClick={bad}>huono</button>
      <button>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali</div>
      <div>huono</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)