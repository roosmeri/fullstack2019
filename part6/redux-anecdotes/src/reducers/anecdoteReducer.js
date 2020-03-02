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
      return action.data
    case 'NEW_ANECDOTE':
      return sort([...state, action.data])
    case 'VOTE':
      return sort(state.map(x => {
        if (x.id === action.data.id) {
          console.log('found vote object')
          return {
            id: x.id,
            content: x.content,
            votes: x.votes + 1
          }
        } else {
          return x
        }
      }))
    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}


export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer