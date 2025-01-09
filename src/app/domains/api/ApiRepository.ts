import { Api } from './Api';

export interface ApiRepository {
  createApi(api: Api): Promise<void>;
  getApis(): Promise<Api[]>;
}