import { ApiRepository } from './ApiRepository';
import { Api } from './Api';
import ApiRepositoryImpl from '../../infrastructure/api/ApiRepositoryImpl';

const API_URL = 'http://localhost:3000';

class ApiService {
  private apiRepository: ApiRepository;

  constructor(apiRepository: ApiRepository) {
    this.apiRepository = apiRepository;
  }

  async createApi(api: Omit<Api, 'id'>): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/apis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(api),
      });

      if (!response.ok) {
        throw new Error('Failed to create API');
      }
    } catch (error) {
      console.error('Error creating API:', error);
      throw error;
    }
  }

  async getApis(): Promise<Api[]> {
    try {
      const response = await fetch(`${API_URL}/apis`);
      if (!response.ok) {
        throw new Error('Failed to fetch APIs');
      }
      const data = await response.json();
      return data as Api[];
    } catch (error) {
      console.error('Error fetching APIs:', error);
      throw error;
    }
  }
}

export default new ApiService(new ApiRepositoryImpl());