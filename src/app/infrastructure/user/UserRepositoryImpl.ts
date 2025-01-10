import { UserRepository } from '../../domains/user/UserRepository';
import axios from 'axios';

class UserRepositoryImpl implements UserRepository {
  async loginUser(username: string, password: string): Promise<void> {
    // Implement login logic here
  }

  async loginWithGoogle(tokenId: string): Promise<any> {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`);
      const { sub, name, email, picture } = response.data;
      return {
        id: sub,
        name,
        email,
        picture,
      };
    } catch (error) {
      console.error('Error verifying Google token:', error);
      throw new Error('Invalid Google token');
    }
  }

  async registerUser(username: string, password: string, email: string): Promise<void> {
    // Implement user registration logic here
  }
}

export default UserRepositoryImpl;