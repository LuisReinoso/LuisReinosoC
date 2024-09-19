import { ProductInterface } from './product.model';

export interface AddProductSuccessAPI {
  message: string;
  data: ProductInterface;
}

export interface AddProductErrorAPI {
  message: string;
  name: ProductInterface;
}

export enum ProductError {
  duplicateId = 'Duplicate identifier found in the database',
  notFoundUpdate = 'Not product found with that identifier'
}

export interface ListProductsSuccessAPI {
  data: ProductInterface[];
}

export interface UpdateProductsSuccessAPI {
  message: string;
  data: ProductInterface;
}

export interface UpdateProductsErrorAPI {
  message: string;
  name: string;
}
