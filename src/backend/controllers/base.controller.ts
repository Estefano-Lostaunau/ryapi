import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { BaseService } from '../services/base.service';

export class BaseController<T extends Document> {
  constructor(protected service: BaseService<T>) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.findById(req.params.id);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.delete(req.params.id);
      if (!item) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}