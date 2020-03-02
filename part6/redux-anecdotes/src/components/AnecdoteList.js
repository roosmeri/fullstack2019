import React, { useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import {
  voteAnecdote,
  initializeAnecdotes
} from '../reducers/anecdoteReducer'
import {
  createNotification,
  deleteNotification
} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  // @ts-ignore
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      dispatch(initializeAnecdotes(anecdotes))
    )
  }, [dispatch])

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(createNotification(`Voted anecdote '${content}'`))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
