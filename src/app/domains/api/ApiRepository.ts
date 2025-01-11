import { Api } from './Api';

export interface ApiRepository {
  createApi(api: Omit<Api, 'id'>): Promise<void>;
  getApis(): Promise<Api[]>;
  getApiById(id: string): Promise<Api>;
  updateApi(id: string, api: Omit<Api, 'id'>): Promise<void>;
}