import { User } from './User';

export interface UserRepository {
  loginUser(username: string, password: string): Promise<User>;
  loginWithGoogle(tokenId: string): Promise<User>;
  registerUser(username: string, password: string, email: string): Promise<User>;
}