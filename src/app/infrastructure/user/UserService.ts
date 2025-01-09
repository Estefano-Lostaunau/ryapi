import { UserRepository } from './UserRepository';
import UserRepositoryImpl from './UserRepositoryImpl';

class UserService {
  constructor(private userRepository: UserRepository) {}

  async loginUser(username: string, password: string): Promise<void> {
    await this.userRepository.loginUser(username, password);
  }

  async loginWithGoogle(tokenId: string): Promise<void> {
    await this.userRepository.loginWithGoogle(tokenId);
  }
}

export default new UserService(new UserRepositoryImpl());