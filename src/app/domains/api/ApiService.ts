import { ApiRepository } from './ApiRepository';
import { Api } from './Api';
import ApiRepositoryImpl from '../../infrastructure/api/ApiRepositoryImpl';

class ApiService {
  constructor(private readonly apiRepository: ApiRepository) { }

  async createApi(api: Omit<Api, 'id'>): Promise<void> {
    try {
      await this.apiRepository.createApi(api);
    } catch (error) {
      console.error('Error creating API:', error);
      throw error;
    }
  }

  async getApis(): Promise<Api[]> {
    try {
      return await this.apiRepository.getApis();
    } catch (error) {
      console.error('Error fetching APIs:', error);
      throw error;
    }
  }
  async getApiById(id: string): Promise<Api> {
    try {
      return await this.apiRepository.getApiById(id);
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error;
    }
  }

}

export default new ApiService(new ApiRepositoryImpl());