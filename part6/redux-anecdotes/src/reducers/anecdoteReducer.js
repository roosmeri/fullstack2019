import anecdoteService from '../services/anecdotes'

const sort = (state) => {
  return state
    .sort(
      (a, b) =>
        (a.votes < b.votes) ?
          1
          :
          ((b.votes < a.votes) ?
            -1
            :
            0)
    )
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return sort(action.data)
    case 'NEW_ANECDOTE':
      return sort([...state, action.data])
    case 'VOTE':
      return sort(action.data)
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id, oldObject) => {
  return async dispatch => {
    const newObject = {
      id: id,
      content: oldObject.content,
      votes: oldObject.votes + 1
    }
    await anecdoteService.update(id, newObject)
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'VOTE',
      data: anecdotes
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }

}

export default anecdoteReducer