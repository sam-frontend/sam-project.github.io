import mongoose from '../db.js'

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  github: { type: String },
  liveUrl: { type: String },
}, { timestamps: true })

export const Project = mongoose.model('Project', ProjectSchema)
