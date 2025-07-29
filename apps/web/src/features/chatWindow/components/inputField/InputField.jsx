import styles from './InputField.module.css'
import { useRef } from 'react'
import { IoSend } from 'react-icons/io5'

export default function InputField({ hendleSend, message, setMessage }) {

  const textareaRef = useRef(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  return (
    <div className={styles['form-container']}>
      <form action={hendleSend} className={styles.form}>
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles['auto-textarea']}
          placeholder="Type your message..."
          rows={1}
        />
        <button type="submit" className={styles.send}>
          <IoSend className={styles.icon} />
        </button>
      </form>
    </div>
  )
}
