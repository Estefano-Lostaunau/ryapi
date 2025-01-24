import { Api } from './Api';

export interface User {
  id: string;
  username: string;
  email: string;
  picture?: string;
  apis: Api[];
  createdAt: string;
  updatedAt: string | null;
}