import mongoose, { Document } from 'mongoose';
import { IAttribute } from './attribute.model';

export interface ITable extends Document {
  name: string;
  apiId: mongoose.Types.ObjectId;
  attributes: mongoose.Types.ObjectId[] | IAttribute[];
  createdAt: Date;
  updatedAt: Date;
}

const tableSchema = new mongoose.Schema<ITable>({
  name: { type: String, required: true },
  apiId: { type: mongoose.Schema.Types.ObjectId, ref: 'Api', required: true },
  attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' }]
}, {
  timestamps: true
});

export const TableModel = mongoose.model<ITable>('Table', tableSchema);