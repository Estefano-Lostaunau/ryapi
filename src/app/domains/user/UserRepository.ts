import { User } from '../types';

export interface UserRepository {
  loginUser(username: string, password: string): Promise<void>;
  loginWithGoogle(tokenId: string): Promise<void>;
  registerUser(username: string, password: string, email: string): Promise<void>;
}