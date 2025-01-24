import { IApi, ApiModel } from '../models/api.model';
import { BaseService } from './base.service';

export class ApiService extends BaseService<IApi> {
  constructor() {
    super(ApiModel);
  }

  async findByUserId(userId: string): Promise<IApi[]> {
    return await this.model.find({ userId }).populate('tables');
  }
}