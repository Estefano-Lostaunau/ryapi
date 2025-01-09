import { ApiRepository } from '../../domains/api/ApiRepository';
import { Api } from '../../domains/api/Api';

class ApiRepositoryImpl implements ApiRepository {
  private apis: Api[] = [];

  async createApi(api: Api): Promise<void> {
    this.apis.push({ ...api, id: Date.now().toString() });
  }

  async getApis(): Promise<Api[]> {
    return this.apis;
  }
}

export default ApiRepositoryImpl;