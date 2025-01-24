import { IAttribute, AttributeModel } from '../models/attribute.model';
import { BaseService } from './base.service';

export class AttributeService extends BaseService<IAttribute> {
  constructor() {
    super(AttributeModel);
  }

  async findByTableId(tableId: string): Promise<IAttribute[]> {
    return await this.model.find({ tableId });
  }
}