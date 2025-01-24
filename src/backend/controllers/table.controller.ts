import { Request, Response } from 'express';
import { TableService } from '../services/table.service';
import { ITable } from '../models/table.model';
import { BaseController } from './base.controller';

export class TableController extends BaseController<ITable> {
  constructor() {
    super(new TableService());
  }

  async findByApiId(req: Request, res: Response): Promise<void> {
    try {
      const tables = await (this.service as TableService).findByApiId(req.params.apiId);
      res.json(tables);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}