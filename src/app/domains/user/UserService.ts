import { UserRepository } from './UserRepository';
import UserRepositoryImpl from '../../infrastructure/user/UserRepositoryImpl';

class UserService {
  constructor(private userRepository: UserRepository) {}

  async loginUser(username: string, password: string): Promise<void> {
    await this.userRepository.loginUser(username, password);
  }

  async loginWithGoogle(tokenId: string): Promise<any> {
    return await this.userRepository.loginWithGoogle(tokenId);
  }

  async registerUser(username: string, password: string, email: string): Promise<void> {
    await this.userRepository.registerUser(username, password, email);
  }
}

export default new UserService(new UserRepositoryImpl());