import styles from './HomeLayout.module.css'
import NavBar from '../../features/navbar/NavBar'

export default function HomeLayout() {
  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  )
}
