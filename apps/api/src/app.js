import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'

const app = express()

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true) // allow mobile apps, curl, etc.

    const vercelRegex = /^https?:\/\/(.+\.)?vercel\.app$/
    const allowedLocalhost = ['http://127.0.0.1:5173']

    if (vercelRegex.test(origin) || allowedLocalhost.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

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
