import formatUrl from '../../../utils/formatUrl'

const apiUrl = import.meta.env.VITE_API_URL
const token = localStorage.getItem('Bearer')

export async function getAllUsers() {
  const res = await fetch(`${formatUrl(apiUrl)}api/users`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Getting users failed')
  }

  const data = await res.json()

  return data
}

export async function getOrCreateChannel(userAId, userBId) {
  const res = await fetch(`${formatUrl(apiUrl)}api/channels`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userAId, userBId }),
  })

  const data = res.json()

  return data
}
