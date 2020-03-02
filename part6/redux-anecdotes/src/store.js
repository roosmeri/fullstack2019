import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer
})


const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store