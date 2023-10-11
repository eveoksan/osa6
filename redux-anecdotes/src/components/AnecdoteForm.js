import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const formHandler = async e => {
    e.preventDefault()

    const {
      target: { anecdote },
    } = e

    dispatch(createAnecdote(anecdote.value))
    dispatch(setNotification(`New anecdote :-> ${anecdote.value}`, 5))
    anecdote.value = ''
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={formHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm