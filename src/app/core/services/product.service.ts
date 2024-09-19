import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductSuccessAPI, ListProductsSuccessAPI, UpdateProductsSuccessAPI } from '@app/models/product-api.model';
import { ProductInterface } from '@app/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(product: ProductInterface): Observable<AddProductSuccessAPI> {
    return this.http.post(`/bp/products`, product) as Observable<AddProductSuccessAPI>;
  }

  listProducts(): Observable<ListProductsSuccessAPI> {
    return this.http.get(`/bp/products`) as Observable<ListProductsSuccessAPI>;
  }

  checkIfProductExists(id: ProductInterface['id']): Observable<boolean> {
    return this.http.get(`/bp/products/verification/${id}`) as Observable<boolean>;
  }

  loadProductById(productId: string): Observable<ProductInterface> {
    return this.http.get(`/bp/products/${productId}`) as Observable<ProductInterface>;
  }

  updateProduct(productId: ProductInterface['id'], product: ProductInterface): Observable<UpdateProductsSuccessAPI> {
    return this.http.put(`/bp/products/${productId}`, product) as Observable<UpdateProductsSuccessAPI>;
  }
}
