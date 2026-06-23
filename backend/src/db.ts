import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sam-portfolio'

export async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}

export default mongoose
