import { useState } from 'react'
import styles from './ChatList.module.css'
import Avatar from '/src/assets/anonym.svg?react'
import Global from '/src/assets/global.svg?react'

// render img conditionaly like if there is avatar on storage load it if not give default avatar

const chats = [
  { id: 1, avatar: Global, title: 'Global Chat' },
  { id: 2, avatar: Avatar, title: 'Some random dude' },
]

export default function ChatList() {
  const [activeChat, setActiveChat] = useState(null)

  const handleClick = (e) => {
    const el = e.currentTarget

    // 🔥 FORCE RE-RUN ANIMATION:
    el.classList.remove(styles.animate)
    void el.offsetWidth // this line forces a browser reflow
    el.classList.add(styles.animate)

    setActiveChat(Number(el.dataset.id))
  }

  return (
    <main className={styles.container}>
      {chats.map((chat) => (
        <div
          className={`${styles.chat} ${activeChat === chat.id ? `${styles.active} ${styles.animate}` : ''}`}
          onClick={handleClick}
          key={chat.id}
          data-id={chat.id}
        >
          <chat.avatar className={styles.avatar} />
          <span className={styles.title}>{chat.title}</span>
        </div>
      ))}

      {/* <div className={styles.chat} onClick={handleClick}>
        <Global className={styles.avatar} />
        <span className={styles.title}>Global Chat</span>
      </div>

      <div className={styles.chat}>
        <Avatar className={styles.avatar} />
        <span className={styles.title}>Some random dude</span>
      </div> */}
    </main>
  )
}
