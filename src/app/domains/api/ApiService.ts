import { ApiRepository } from './ApiRepository';
import { Api } from './Api';
import ApiRepositoryImpl from '../../infrastructure/api/ApiRepositoryImpl';

class ApiService {
  constructor(private apiRepository: ApiRepository) { }

  async createApi(api: Omit<Api, 'id'>): Promise<void> {
    const newApi: Api = { ...api, id: Date.now().toString() };
    await this.apiRepository.createApi(newApi);
  }

  async getApis(): Promise<Api[]> {
    return await this.apiRepository.getApis();
  }
}

export default new ApiService(new ApiRepositoryImpl());