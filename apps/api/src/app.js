import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'
import { CORS_ORIGIN } from './config/config.js'

const app = express()

const allowedOrigins = [CORS_ORIGIN]

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Incoming origin:', origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn('Blocked by CORS:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
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
