import { Request, Response } from 'express';
import { AttributeService } from '../services/attribute.service';
import { IAttribute } from '../models/attribute.model';
import { BaseController } from './base.controller';

export class AttributeController extends BaseController<IAttribute> {
  constructor() {
    super(new AttributeService());
  }

  async findByTableId(req: Request, res: Response): Promise<void> {
    try {
      const attributes = await (this.service as AttributeService).findByTableId(req.params.tableId);
      res.json(attributes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}