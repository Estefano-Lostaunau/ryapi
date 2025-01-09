import { ApiRepository } from './ApiRepository';
import { Api } from './Api';
import ApiRepositoryImpl from './ApiRepositoryImpl';

class ApiService {
  constructor(private apiRepository: ApiRepository) {}

  async createApi(api: Api): Promise<void> {
    await this.apiRepository.createApi(api);
  }

  async getApis(): Promise<Api[]> {
    return await this.apiRepository.getApis();
  }
}

export default new ApiService(new ApiRepositoryImpl());