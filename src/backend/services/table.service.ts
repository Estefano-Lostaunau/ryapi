import { ITable, TableModel } from '../models/table.model';
import { BaseService } from './base.service';

export class TableService extends BaseService<ITable> {
  constructor() {
    super(TableModel);
  }

  async findByApiId(apiId: string): Promise<ITable[]> {
    return await this.model.find({ apiId }).populate('attributes');
  }
}