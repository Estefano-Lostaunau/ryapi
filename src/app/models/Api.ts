export interface Attribute {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isRequired?: boolean;
  length?: number;
}

export interface Table {
  name: string;
  attributes: Attribute[];
}
export const dataTypes = ['string', 'number', 'boolean', 'date', 'uuid'];

export interface Api {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
  tables: Table[];
}