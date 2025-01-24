import mongoose, { Document } from 'mongoose';

export const dataTypes = ['string', 'number', 'boolean', 'date', 'uuid'] as const;
type DataType = typeof dataTypes[number];

export interface IAttribute extends Document {
  name: string;
  type: DataType;
  isPrimaryKey: boolean;
  isRequired: boolean;
  length?: number;
  tableId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const attributeSchema = new mongoose.Schema<IAttribute>({
  name: { type: String, required: true },
  type: { type: String, enum: dataTypes, required: true },
  isPrimaryKey: { type: Boolean, default: false },
  isRequired: { type: Boolean, default: true },
  length: Number,
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true }
}, {
  timestamps: true
});

export const AttributeModel = mongoose.model<IAttribute>('Attribute', attributeSchema);