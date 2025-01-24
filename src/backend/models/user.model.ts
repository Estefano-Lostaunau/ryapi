import mongoose, { Document } from 'mongoose';
import { IApi } from './api.model';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  picture?: string;
  apis: mongoose.Types.ObjectId[] | IApi[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: String,
  apis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Api' }]
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUser>('User', userSchema);