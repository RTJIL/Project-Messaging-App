import styles from './ChatWindow.module.css'
import MessageList from './components/messageList/MessageList'
import InputField from './components/inputField/InputField'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createMessage } from './services/api'

export default function ChatWindow() {
  const location = useLocation()
  const navigate = useNavigate()
  console.log('Location state', location.state)

  const { channelId } = useParams()

  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState(location.state.data.messages || [])

  const currentUid = location.state.currentUid
  const userA = location.state.data.userA
  const userB = location.state.data.userB

  const handleSend = async () => {
    const content = message.trim()
    if (!content) return

    try {
      const newMessage = await createMessage(content, channelId)
      setMessages((prev) => [...prev, newMessage])
      setMessage('')
    } catch (err) {
      console.error('Failed to create message:', err.message)
    }
  }

  useEffect(() => {
    if (!location.state || !location.state.data) {
      navigate('/')
      return
    }

    setMessages(location.state.data.messages)
  }, [location.state])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles['bottom-line']}></div>
        <img
          src={currentUid !== userA ? userA.avatarUrl : userB.avatarUrl}
          alt="avatar"
          className={styles.avatar}
        />
        <span>{currentUid !== userA ? userA.username : userB.username}</span>
      </header>

      <div className={styles.chatContainer}>
        <MessageList messages={messages} currentUid={currentUid}/>
        <InputField
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </div>
    </main>
  )
}
