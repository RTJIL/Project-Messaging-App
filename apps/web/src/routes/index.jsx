// index.js
import { createBrowserRouter } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import HomeLayout from '../layouts/homeLayout/HomeLayout'
import PrivateRoute from '../features/auth/components/PublicRoute'
import PublicRoute from '../features/auth/components/Public'
import ChatWindow from '../features/chatWindow/ChatWindow'

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
        children: [{ path: '/:channelId', element: <ChatWindow /> }],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
])
