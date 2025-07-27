import styles from './NavBar.module.css'
import Dropdown from './components/dropdown/Dropdown'
import SearchBar from './components/searchBar/SearchBar'
import ChatTabs from './components/chatTabs/ChatTabs'
import ChatList from './pages/chatList/ChatList'

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <header>
        <div className={styles.firstLayer}>
          <Dropdown />
          <SearchBar />
        </div>

        <ChatTabs />
      </header>

      <ChatList />
    </nav>
  )
}
