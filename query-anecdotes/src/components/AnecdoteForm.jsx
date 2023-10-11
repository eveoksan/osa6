import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createAnecdote } from './requests'
import { useNotification } from './NotificationContext'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')
  const { mutate: createAnecdoteMutation } = useMutation(createAnecdote)
  const { setNotification } = useNotification()

  const onCreate = async (event) => {
    event.preventDefault()

    if (anecdote.length < 5) {
      setNotification('Anecdote must be at least 5 characters long', 'error')
      return
    }
    try {
      await createAnecdoteMutation({ content: anecdote })
      setAnecdote('')
    } catch (error) {
      setNotification('An error occurred while creating the anecdote', 'error')
    }
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input 
        name='anecdote'
        value={anecdote} 
        onChange={(e) => setAnecdote(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm