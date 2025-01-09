import { UserRepository } from '../../domains/user/UserRepository';

class UserRepositoryImpl implements UserRepository {
  async loginUser(username: string, password: string): Promise<void> {
    // Implement login logic here
  }

  async loginWithGoogle(tokenId: string): Promise<void> {
    // Implement Google login logic here
  }

  async registerUser(username: string, password: string): Promise<void> {
    // Implement registration logic here
  }
}

export default UserRepositoryImpl;