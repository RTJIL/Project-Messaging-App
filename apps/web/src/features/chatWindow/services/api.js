import formatUrl from '../../../utils/formatUrl'

const apiUrl = import.meta.env.VITE_API_URL

export async function createMessage(content, channelId) {
  const token = localStorage.getItem('Bearer')
  const res = await fetch(`${formatUrl(apiUrl)}api/messages/${channelId}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  return await res.json()
}
