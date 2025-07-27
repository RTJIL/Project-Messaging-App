import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const [search, setSearch] = useState('')

  const handleSearch = (formData) => {}

  return (
    <form action={handleSearch} className={styles.form}>
      <label htmlFor="search"></label>
      <div className={styles.inputWrapper}>
        <IoSearch className={styles.icon} />
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className={styles.input}
        />
      </div>
    </form>
  )
}
