import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {makeNotification} from '../reducers/notificationReducer'
import { createVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    const filtered = state.anecdotes.filter(anecdote => (
      anecdote.content.includes(state.filter))
    )
    return filtered
  }
  )


  const vote = (anecdote) => {
    dispatch(createVote(anecdote))
    dispatch(makeNotification(`you voted '${anecdote.content}'`, 10))
  }

  const Anecdote = ({ anecdote }) => {
    return (
      <div>
        <div>
          {anecdote.content}
        </div>
        <div>
        has <strong>{anecdote.votes}</strong>
        <button onClick={() =>vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {anecdotes
        .sort((last, first) => first.votes - last.votes)
        .map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote}/>
        ))}
    </div>
  )
  }

export default AnecdoteList