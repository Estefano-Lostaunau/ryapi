import { Request, Response } from 'express';
import { ApiService } from '../services/api.service';
import { IApi } from '../models/api.model';
import { BaseController } from './base.controller';

export class ApiController extends BaseController<IApi> {
  constructor() {
    super(new ApiService());
  }

  async findByUserId(req: Request, res: Response): Promise<void> {
    try {
      const apis = await (this.service as ApiService).findByUserId(req.params.userId);
      res.json(apis);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}