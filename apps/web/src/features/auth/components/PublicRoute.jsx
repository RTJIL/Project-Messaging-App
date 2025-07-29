import { Navigate, Outlet } from 'react-router-dom'

const isTokenValid = () => {
  const token = localStorage.getItem('Bearer')
  if (!token) return false

  // Decode token expiry (assuming JWT)
  const payload = JSON.parse(atob(token.split('.')[1]))
  const now = Date.now() / 1000

  return payload.exp && payload.exp > now
}

export default function PrivateRoute() {
  return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />
}