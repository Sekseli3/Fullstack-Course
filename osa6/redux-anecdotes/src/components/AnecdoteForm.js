import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { makeNotification} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content= event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(makeNotification(`Created '${content}'`,10))
    
  }
 

  return (
    <div>
      <h2>Create a new Anecdote</h2>
      <form onSubmit={addAnecdote}>
      <input name='newAnecdote' />
      <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm