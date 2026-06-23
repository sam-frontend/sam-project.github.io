import { Router, Request, Response } from 'express'
import { BlogPost } from '../models/BlogPost.js'

const router = Router()

// GET /api/blog - Fetch all blog posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0
    const total = await BlogPost.countDocuments()
    const data = await BlogPost.find().sort({ date: -1 }).skip(offset).limit(limit).lean()
    res.json({ data, total, limit, offset })
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch blog posts' })
  }
})

// GET /api/blog/:slug - Fetch single blog post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).lean()
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json({ data: post })
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch post' })
  }
})

// GET /api/blog/tag/:tag - Fetch posts by tag
router.get('/tag/:tag', async (req: Request, res: Response) => {
  try {
    const tag = req.params.tag.toLowerCase()
    const data = await BlogPost.find({ tags: { $in: [new RegExp(tag, 'i')] } }).lean()
    res.json({ data, total: data.length, tag })
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch posts by tag' })
  }
})

export const blogRouter = router
