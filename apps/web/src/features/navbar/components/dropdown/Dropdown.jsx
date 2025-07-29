import styles from './Dropdown.module.css'
import { IoMenu } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserDataFromJWT from '../../../../utils/getUserDataFromJWT'

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false)
  const dropdownRef = useRef(null)

  //todo make config file and store values used in different components
  const userData = getUserDataFromJWT()
  const localStorageKey = `activeChat-${userData.id}`

  const navigate = useNavigate()

  const { username, avatar } = getUserDataFromJWT()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false)
      }
    }

    if (dropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdown])

  const logout = () => {
    localStorage.removeItem('Bearer')
    localStorage.removeItem(localStorageKey)
    navigate('/login')
  }

  return (
    <div
      className={styles['dropdown-cotainer']}
      onClick={() => {
        setDropdown((prev) => !prev)
      }}
      ref={dropdownRef}
    >
      <IoMenu
        className={`${styles.icon} ${dropdown ? styles.activeIcon : ''}`}
      />
      {dropdown && (
        <div className={`${styles['dropdown-menu']} ${styles.active}`}>
          <section className={styles.profile}>
            <img src={avatar} alt="avatar" />
            <p>{username}</p>
          </section>

          <section className={styles.logout}>
            <LuLogOut />
            <button onClick={logout}>Log Out</button>
          </section>
        </div>
      )}
    </div>
  )
}
