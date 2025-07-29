export default function getUserDataFromJWT() {
  const token = localStorage.getItem('Bearer')

  if (!token) return null

  const payloadBase64 = token.split('.')[1]
  const payloadJson = atob(payloadBase64)
  const payload = JSON.parse(payloadJson)

  const id = payload.sub
  const username = payload.username
  const avatar = payload.avatar

  return { id, username, avatar }
}
