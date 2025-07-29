import styles from './HomeLayout.module.css'
import NavBar from '../../features/navbar/NavBar'
import ChatWindow from '../../features/chatWindow/ChatWindow'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Outlet />
    </div>
  )
}
