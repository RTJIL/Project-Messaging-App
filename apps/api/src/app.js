import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error('[ERROR]', err)

  const status = err.status || 500
  const message = err || 'Internal Server Error'

  res.status(status).json({
    error: err.message,
    fields: err.fields || {},
  })
})

export default app
