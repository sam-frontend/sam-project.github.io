import { Router, Request, Response } from 'express'
import { Project } from '../models/Project.js'

const router = Router()

// GET /api/projects - Fetch all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await Project.find().sort({ createdAt: -1 }).lean()
    res.json({ data, total: data.length })
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch projects' })
  }
})

// GET /api/projects/:id - Fetch single project
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).lean()
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ data: project })
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch project' })
  }
})

// POST /api/projects - Create new project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, tags, github, liveUrl } = req.body
    if (!title || !description) return res.status(400).json({ error: 'Title and description are required' })

    const created = await Project.create({ title, description, tags: tags || [], github, liveUrl })
    res.status(201).json({ data: created })
  } catch (err) {
    res.status(500).json({ error: 'Unable to create project' })
  }
})

export const projectRouter = router
