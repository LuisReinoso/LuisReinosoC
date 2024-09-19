import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductSuccessAPI, ListProductsSuccessAPI } from '@app/models/product-api.model';
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
}
