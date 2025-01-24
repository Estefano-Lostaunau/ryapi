import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.model';
import { BaseController } from './base.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class UserController extends BaseController<IUser> {
  constructor() {
    super(new UserService());
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.service.create(req.body);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await (this.service as UserService).findByEmail(email);
      if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}