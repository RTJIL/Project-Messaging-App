import styles from './MessageList.module.css'
import { formatDate } from '../../../../utils/formatDate'
import { useState, useEffect, useRef } from 'react'

export default function MessageList({ messages, currentUid }) {
  // const [loading, setLoading] = useState(true)
  let lastDate = null

  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  /* useEffect(() => {
    if (messages?.length >= 0) {
      const timer = setTimeout(() => setLoading(false), 100)
      return () => clearTimeout(timer)
    }
  }, [messages]) */

  /* if (loading)
    return (
      <div className={styles['position-container']}>
        <div className={styles['loading-container']}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonMessage}>
              <div className={styles.skeletonAvatar}></div>
              <div className={styles.skeletonText}></div>
            </div>
          ))}
        </div>
      </div>
    ) */

  return (
    <div className={styles['scroll-container']}>
      <div className={styles.container}>
        {messages.map((message) => {
          const currentDate = formatDate(message.createdAt)
          const showDateHeader = currentDate !== lastDate
          const isSentByCurrentUser = message.sender.id === currentUid
          lastDate = currentDate

          return (
            <section className={styles.section} key={message.id}>
              {showDateHeader && <p className={styles.date}>{currentDate}</p>}
              <article
                className={`${styles.message} ${
                  isSentByCurrentUser
                    ? styles['message-right']
                    : styles['message-left']
                }`}
              >
                <div className={styles.content}>
                  <img
                    src={message.sender.avatarUrl}
                    alt="avatar"
                    className={styles.avatar}
                  />
                  <p className={styles.text}>{message.content}</p>
                </div>
                <p className={styles.username}>#{message.sender.username}</p>
              </article>
            </section>
          )
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
