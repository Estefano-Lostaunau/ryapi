import mongoose, { Document } from 'mongoose';
import { ITable } from './table.model';

export interface IApi extends Document {
  name: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  tables: mongoose.Types.ObjectId[] | ITable[];
  createdAt: Date;
  updatedAt: Date;
}

const apiSchema = new mongoose.Schema<IApi>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }]
}, {
  timestamps: true
});

export const ApiModel = mongoose.model<IApi>('Api', apiSchema);