import mongoose from '../db.js'

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true })

export const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema)
