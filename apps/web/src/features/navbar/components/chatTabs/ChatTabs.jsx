import styles from './ChatTabs.module.css'
import { useState } from 'react'
import ChatList from '../../pages/chatList/ChatList'

export default function ChatTabs() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className={styles.container}>
      <button
        className={activeTab === 'all' ? styles.active : ''}
        onClick={() => setActiveTab('all')}
      >
        All Chats
      </button>
    </div>
  )
}
