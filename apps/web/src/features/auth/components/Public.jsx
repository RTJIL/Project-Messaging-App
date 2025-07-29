import { Navigate, Outlet } from 'react-router-dom'

const isTokenValid = () => {
  const token = localStorage.getItem('Bearer')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Date.now() / 1000
    return payload.exp && payload.exp > now
  } catch {
    return false
  }
}

export default function PublicRoute() {
  return !isTokenValid() ? <Outlet /> : <Navigate to="/" replace />
}
