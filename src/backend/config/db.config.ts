import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { JWT_SECRET, JWT_EXPIRES_IN };