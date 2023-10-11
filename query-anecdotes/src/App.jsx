import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient, isError } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotification } from './NotificationContext'

const App = () => {

  const [error, setError] = useState(null)
  const { notification, setNotification } = useNotification()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const voteMutation = useMutation(voteAnecdote, {
    onMutate: (anecdote) => {
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });

const addAnecdote = async (content) => {
  try {
    const newAnecdote = await newAnecdoteMutation.mutateAsync({ content })
    const anecdotes = queryClient.getQueryData('anecdotes');
    queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    setNotification('New anecdote created', 'info')
  } catch (error) {
    setError('Anecdote service not available due to problems in the server')
  }
}

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result-isError ){
    return <div>Anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data


  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    setNotification('Anecdote voted', 'info')
    setTimeout(() => setNotification('', ''), 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {notification.message && (
        <Notification message={notification.message} isError={notification.type === 'error'} />
      )}
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App