import { Document, Model } from 'mongoose';

export class BaseService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const item = new this.model(data);
    return await item.save();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }
}