import styles from './ChatList.module.css'
import Avatar from '/src/assets/anonym.svg?react'
import { FaBookmark } from 'react-icons/fa6'
import { getAllUsers, getOrCreateChannel } from '../../services/api'
import getUserDataFromJWT from '../../../../utils/getUserDataFromJWT'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ghost } from 'lucide-react'

export default function ChatList() {
  const userData = getUserDataFromJWT()
  const localStorageKey = `activeChat-${userData.id}`

  const [channelLoadingId, setChannelLoadingId] = useState(null)

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

    if (channelLoadingId !== null || id === activeChat) return

    setRipples((prev) => ({
      ...prev,
      [id]: { x, y, key: Date.now() },
    }))

    setActiveChat(id)
    setChannelLoadingId(id)

    const userData = getUserDataFromJWT()
    try {
      const data = await getOrCreateChannel(userData.id, id)
      if (data) {
        navigate(`/${data.id}`, {
          state: { data, currentUid: userData.id },
        })
      }
      // console.log(data)
    } catch (err) {
      console.error('Failed to create or get channel:', err.message)
    } finally {
      setChannelLoadingId(null)
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

  if (loading && users.length === 0) {
    return (
      <div className={styles.empty}>
        <Ghost size={48} color="#a78bfa" style={{ marginBottom: '1rem' }} />
        No users found.
      </div>
    )
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (a.id === userData.id) return -1
    if (b.id === userData.id) return 1
    return 0
  })

  return (
    <div className={styles.container}>
      {Array.isArray(users) &&
        sortedUsers.map((user) => (
          <div
            className={`
            ${styles.chat} 
            ${activeChat === user.id ? styles.active : ''} 
            ${channelLoadingId !== null && channelLoadingId !== user.id ? styles.disabled : ''}
            `}
            onClick={handleClick}
            key={user.id}
            data-id={user.id}
          >
            <div className={styles.avatarWrapper}>
              {channelLoadingId === user.id ? (
                <div className={styles.loaderMini}></div>
              ) : user.id === userData.id ? (
                <FaBookmark className={styles['avatarIcon']} />
              ) : (
                <img
                  src={user.avatarUrl || Avatar}
                  alt="avatar"
                  className={styles.avatar}
                />
              )}
            </div>
            <span className={styles.title}>
              {user.id === userData.id ? 'Personal' : user.username}
            </span>

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