import { ApiRepository } from '../../domains/api/ApiRepository';
import { Api } from '../../domains/api/Api';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

class ApiRepositoryImpl implements ApiRepository {
  async createApi(api: Omit<Api, 'id'>): Promise<void> {
    try {
      const response = await axios.post(`${API_URL}/apis`, api, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201 && response.status !== 200) {
        throw new Error('Failed to create API');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create API');
    }
  }

  async getApis(): Promise<Api[]> {
    try {
      const response = await axios.get<Api[]>(`${API_URL}/apis`);
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch APIs');
    }
  }
}

export default ApiRepositoryImpl;