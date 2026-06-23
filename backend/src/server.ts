import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { projectRouter } from './routes/projects.js'
import { contactRouter } from './routes/contact.js'
import { blogRouter } from './routes/blog.js'
import { connectDb } from './db.js'

config()

const app: Express = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend API is running', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/projects', projectRouter)
app.use('/api/contact', contactRouter)
app.use('/api/blog', blogRouter)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found', path: req.path })
})

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})

;(async () => {
  try {
    await connectDb()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📡 CORS enabled for ${FRONTEND_URL}`)
    })
  } catch (err) {
    console.error('Failed to start server due to DB connection error')
    process.exit(1)
  }
})()
