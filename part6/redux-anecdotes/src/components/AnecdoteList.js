import React, { useEffect } from 'react'
import {
  voteAnecdote,
  initializeAnecdotes
} from '../reducers/anecdoteReducer'
import {
  createNotification
} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  // @ts-ignore
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch])

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id, anecdote))
    dispatch(createNotification(`Voted anecdote '${anecdote.content}'`, 5))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
