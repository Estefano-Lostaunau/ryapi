import UserRepositoryImpl from '../../infrastructure/user/UserRepositoryImpl';
import { UserRepository } from './UserRepository';

class UserService {
  constructor(private userRepository: UserRepository) { }

  async loginUser(username: string, password: string): Promise<void> {
    await this.userRepository.loginUser(username, password);
  }

  async loginWithGoogle(tokenId: string): Promise<void> {
    await this.userRepository.loginWithGoogle(tokenId);
  }

  async registerUser(username: string, password: string): Promise<void> {
    await this.userRepository.registerUser(username, password);
  }
}

export default new UserService(new UserRepositoryImpl());