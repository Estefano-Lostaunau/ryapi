import { IUser, UserModel } from '../models/user.model';
import { BaseService } from './base.service';
import bcrypt from 'bcrypt';

export class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    return super.create({ ...userData, password: hashedPassword });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }
}