import { UserRepository } from '../../domains/user/UserRepository';
import { User } from '../../domains/user/User';
import axios from 'axios';

class UserRepositoryImpl implements UserRepository {
  async loginUser(username: string, password: string): Promise<User> {
    try {
      const response = await axios.post('/api/login', { username, password });
      const { id, email } = response.data;
      return {
        id,
        username,
        email,
        password // Nota: No deberías almacenar la contraseña en el objeto User
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Invalid username or password');
    }
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

  async registerUser(username: string, password: string, email: string): Promise<User> {
    try {
      const response = await axios.post('/api/register', { username, password, email });
      const { id } = response.data;
      return {
        id,
        username,
        email,
        password // Nota: No deberías almacenar la contraseña en el objeto User
      };
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Registration failed');
    }
  }
}

export default UserRepositoryImpl;