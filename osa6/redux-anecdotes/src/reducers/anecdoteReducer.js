import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote) 
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }})





export const { voteAnecdote, appendAnecdote,setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const createVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes +1}
    await anecdoteService.update(anecdote.id,updatedAnecdote)
    dispatch(voteAnecdote(anecdote.id))
}
}

export default anecdoteSlice.reducer