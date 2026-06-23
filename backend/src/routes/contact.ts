import { Router, Request, Response } from 'express'
import { ContactMessage } from '../models/ContactMessage.js'

const router = Router()

// POST /api/contact - Save contact form submission
router.post('/', async (req: Request, res: Response) => {
  const { name, email, message } = req.body

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Validation failed',
      required: ['name', 'email', 'message'],
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    const saved = await ContactMessage.create({ name, email, message })
    // TODO: send email notification via a provider
    res.json({ success: true, data: saved })
  } catch (err) {
    res.status(500).json({ error: 'Unable to save message' })
  }
})

// GET /api/contact/status - Check email service status
router.get('/status', (req: Request, res: Response) => {
  res.json({
    emailService: 'pending_configuration',
    message: 'Email service integration needed',
  })
})

export const contactRouter = router
