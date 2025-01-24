import axios from 'axios';
import { Api } from '../models/Api';
import { User } from '../models/User';


class ApiService {
  private readonly API_URL = 'http://localhost:3000/users';

  async createApi(userId: string, api: Omit<Api, 'id'>): Promise<void> {
    try {
      const user = await this.getUserById(userId);
      const newApi = {
        ...api,
        id: crypto.randomUUID(),
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      user.apis.push(newApi);
      await axios.patch(`${this.API_URL}/${userId}`, { apis: user.apis });
    } catch (error) {
      console.error('Error creating API:', error);
      throw new Error('Failed to create API');
    }
  }

  async getApis(userId: string): Promise<Api[]> {
    try {
      const user = await this.getUserById(userId);
      return user.apis || [];
    } catch (error) {
      console.error('Error fetching APIs:', error);
      throw new Error('Failed to fetch APIs');
    }
  }

  async getApiById(userId: string, apiId: string): Promise<Api> {
    try {
      const user = await this.getUserById(userId);
      const api = user.apis.find(api => api.id === apiId);
      
      if (!api) {
        throw new Error('API not found');
      }
      
      return api;
    } catch (error) {
      console.error('Error fetching API:', error);
      throw new Error('Failed to fetch API');
    }
  }

  async updateApi(userId: string, apiId: string, apiUpdate: Partial<Api>): Promise<void> {
    try {
      const user = await this.getUserById(userId);
      const apiIndex = user.apis.findIndex(api => api.id === apiId);
      
      if (apiIndex === -1) {
        throw new Error('API not found');
      }

      user.apis[apiIndex] = {
        ...user.apis[apiIndex],
        ...apiUpdate,
        updatedAt: new Date().toISOString()
      };

      await axios.patch(`${this.API_URL}/${userId}`, { 
        apis: user.apis 
      });
    } catch (error) {
      console.error('Error updating API:', error);
      throw new Error('Failed to update API');
    }
  }

  private async getUserById(userId: string): Promise<User> {
    try {
      const response = await axios.get(`${this.API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }
}

export default new ApiService();