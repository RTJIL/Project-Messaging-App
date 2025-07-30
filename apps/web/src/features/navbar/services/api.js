import formatUrl from '../../../utils/formatUrl'
import getUserDataFromJWT from '../../../utils/getUserDataFromJWT'

const apiUrl = import.meta.env.VITE_API_URL

function handleUnauthorized() {
  try {
    const userData = getUserDataFromJWT()
    const localStorageKey = `activeChat-${userData?.id}`
    localStorage.removeItem('Bearer')
    localStorage.removeItem(localStorageKey)
    window.location.href = '/login'
  } catch (err) {
    console.error('Failed to clean up after 401:', err)
  }
}

export async function getAllUsers() {
  const token = localStorage.getItem('Bearer')
  const res = await fetch(`${formatUrl(apiUrl)}api/users`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (res.status === 401) {
    handleUnauthorized()
    return
  }

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Getting users failed')
  }

  const data = await res.json()

  return data
}

export async function getOrCreateChannel(userAId, userBId) {
  const token = localStorage.getItem('Bearer')
  const res = await fetch(`${formatUrl(apiUrl)}api/channels`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userAId, userBId }),
  })

  if (res.status === 401) {
    handleUnauthorized()
    return
  }

  const data = await res.json()
  return data
}
