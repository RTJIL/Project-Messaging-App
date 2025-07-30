import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../AuthForm.module.css'
import { loginUser, registerUser } from '../services/api'

export default function AuthForm({ login = false }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
    cpassword: '',
  })
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (formData) => {
    const newErrors = {}

    if (!form.username.trim()) newErrors.username = 'Username is required!'
    if (!form.password) newErrors.password = 'Password is required!'
    if (!login && form.password !== form.cpassword)
      newErrors.cpassword = 'Passwords do not match!'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)

    const { username, password } = Object.fromEntries(formData)

    try {
      if (login) {
        await loginUser({ username, password })
      } else {
        await registerUser({ username, password })
      }

      navigate('/')
    } catch (err) {
      console.log(err)
      setErrors(err.fields || { general: err.error || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>{login ? 'Login' : 'Register'}</h1>
      <form action={handleSubmit} className={styles.form} noValidate>
        <Link to={login ? '/register' : '/login'} className={styles.link}>
          {login ? 'or register' : 'or login'}
        </Link>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="off"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? styles.inputError : ''}
          />
          {errors.username && (
            <span className={styles.errorTooltip}>{errors.username}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? styles.inputError : ''}
          />
          {errors.password && (
            <span className={styles.errorTooltip}>{errors.password}</span>
          )}
        </div>

        {!login && (
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm password"
              name="cpassword"
              autoComplete="off"
              value={form.cpassword}
              onChange={handleChange}
              className={errors.cpassword ? styles.inputError : ''}
            />
            {errors.cpassword && (
              <span className={styles.errorTooltip}>{errors.cpassword}</span>
            )}
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? <span className={styles.spinner} /> : 'Submit'}
        </button>
      </form>
    </div>
  )
}
