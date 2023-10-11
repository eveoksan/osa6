import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const random = () => Math.floor(Math.random() * 100000)

export const asAnecdote = (content) => {
    return {
    "content": content,
    "id": random(),
    "votes": 0
    }
}

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteAnecdote = (anecdote) => { 
  return axios.put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1
  }).then(res => res.data)
}