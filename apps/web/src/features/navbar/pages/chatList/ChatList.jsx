import styles from './ChatList.module.css'
import Avatar from '/src/assets/anonym.svg?react'
import { getAllUsers, getOrCreateChannel } from '../../services/api'
import getUserDataFromJWT from '../../../../utils/getUserDataFromJWT'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ghost } from 'lucide-react'

export default function ChatList() {
  const userData = getUserDataFromJWT()
  const localStorageKey = `activeChat-${userData.id}`

  const [activeChat, setActiveChat] = useState(() => {
    const stored = localStorage.getItem(localStorageKey)
    return stored ? Number(stored) : null
  })

  const [ripples, setRipples] = useState({})
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const handleClick = async (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const id = Number(el.dataset.id)

    setRipples((prev) => ({
      ...prev,
      [id]: { x, y, key: Date.now() },
    }))

    setActiveChat(id)

    const userData = getUserDataFromJWT()
    try {
      const data = await getOrCreateChannel(userData.id, id)
      if (data) {
        navigate(`/${data.id}`, {
          state: { data, currentUid: userData.id },
        })
      }
      console.log(data)
    } catch (err) {
      console.error('Failed to create or get channel:', err.message)
    }
  }

  const handleAnimationEnd = (id) => {
    setRipples((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (err) {
        console.error('Failed to fetch users:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    localStorage.setItem(localStorageKey, activeChat || '')
  }, [activeChat, localStorageKey])

  if (loading)
    return (
      <div className={styles['loading-container']}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.loader}></div>
        ))}
      </div>
    )

  if (!loading /* && users.length === 0 */) {
    return (
      <div className={styles.empty}>
        <Ghost size={48} color="#a78bfa" style={{ marginBottom: '1rem' }} />
        No users found.
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {Array.isArray(users) &&
        users.map((user) => (
          <div
            className={`${styles.chat} ${activeChat === user.id ? styles.active : ''}`}
            onClick={handleClick}
            key={user.id}
            data-id={user.id}
          >
            <img
              src={user.avatarUrl || Avatar}
              alt="avatar"
              className={styles.avatar}
            />
            <span className={styles.title}>{user.username}</span>

            {ripples[user.id] && (
              <span
                key={ripples[user.id].key}
                className={styles.ripple}
                style={{
                  top: ripples[user.id].y,
                  left: ripples[user.id].x,
                }}
                onAnimationEnd={() => handleAnimationEnd(user.id)}
              />
            )}
          </div>
        ))}
    </div>
  )
}