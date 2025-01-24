import axios from 'axios';
import { User } from '../models/User';

class UserService {
  private readonly API_URL = 'http://localhost:3000';

  async loginUser(username: string, password: string): Promise<User> {
    try {
      const response = await axios.get(`${this.API_URL}/users`, {
        params: {
          username,
          password
        }
      });
      
      const users = response.data;
      
      if (users.length === 0) {
        throw new Error('Invalid credentials');
      }
      
      const { password: _, ...userWithoutPassword } = users[0];
      return userWithoutPassword;

    } catch (error) {
      if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
        throw new Error('Server is not running. Please start JSON Server.');
      }
      throw new Error('Invalid username or password');
    }
  }
  async loginWithGoogle(tokenId: string): Promise<User> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`
      );
      
      const { sub, name, email, picture } = response.data;
      return {
        id: sub,
        username: name,
        email,
        picture,
      };
    } catch (error) {
      console.error('Error verifying Google token:', error);
      throw new Error('Invalid Google token');
    }
  }

  async registerUser(username: string, password: string, email: string): Promise<User> {
    try {
      const response = await axios.post(this.API_URL, {
        id: crypto.randomUUID(),
        username,
        password,
        email,
        apis: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw new Error('Registration failed');
    }
  }
}

export default new UserService();