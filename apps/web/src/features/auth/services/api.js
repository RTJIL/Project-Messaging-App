// features/auth/api.js
import formatUrl from '../../../utils/formatUrl.js'

const apiUrl = import.meta.env.VITE_API_URL

export async function loginUser({ username, password }) {
  const res = await fetch(`${formatUrl(apiUrl)}api/auth/login`, {
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    console.log(error)
    throw error
  }

  const bearer = await res.json()

  localStorage.setItem('Bearer', bearer)
}

export async function registerUser({ username, password }) {
  const res = await fetch(`${formatUrl(apiUrl)}api/auth/register`, {
    mode: 'cors',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    console.log(error)
    throw error
  }

  const data = await res.json()

  return data
}
