import mongoose from '../db.js'

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  date: { type: Date },
  author: { type: String },
  tags: { type: [String], default: [] },
}, { timestamps: true })

export const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
