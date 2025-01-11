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

export interface Api {
  id: string;
  name: string;
  description: string;
  tables: Table[];
}