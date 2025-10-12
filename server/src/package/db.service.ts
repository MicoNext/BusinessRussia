import mongoose from 'mongoose'
import config from '../config'

class DatabaseService {
  private uri: string = config.MONGODB_URI
  private connectionPromise: Promise<void> | null = null

  constructor() {
    mongoose.set('strictQuery', false)
  }

  public async connect(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(this.uri, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 10000
        })
        console.info('🟢 MongoDB connected successfully')
        resolve()
      } catch (e) {
        console.error('🔴 MongoDB connection failed:', e)
        reject(e)
      }
    })

    return this.connectionPromise
  }
  public async close(): Promise<void> {
    try {
      await mongoose.disconnect()
      this.connectionPromise = null
      console.info('🔴 MongoDB connections closed')
    } catch (e) {
      console.error('Error closing MongoDB connections:', e)
      throw e
    }
  }

  public isConnected(): boolean {
    return mongoose.connection.readyState === 1
  }
}

export default new DatabaseService()