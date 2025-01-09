import { UserRepository } from '../../domains/user/UserRepository';

class UserRepositoryImpl implements UserRepository {
  async loginUser(username: string, password: string): Promise<void> {
    // Implement login logic here
  }

  async loginWithGoogle(tokenId: string): Promise<void> {
    // Implement Google login logic here
  }
}

export default new UserRepositoryImpl();