import { Injectable } from '@angular/core';
import { ProductInterface } from '@app/models/product.model';
import { ProductService } from './product.service';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListProductService {
  private products = new BehaviorSubject<any[]>([]);
  private displayedItemsCount = new BehaviorSubject<number>(1);
  private searchValue = new BehaviorSubject<string>('');
  private resultMessage = new BehaviorSubject<string>('');

  resultMessage$ = this.resultMessage.asObservable();
  products$ = combineLatest([
    this.products.asObservable(),
    this.displayedItemsCount.asObservable(),
    this.searchValue.asObservable(),
  ]).pipe(
    map(([products, displayedItems, searchValue]) => {
      const filteredProducts = searchValue
        ? products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()))
        : products;
      const finalProducts = filteredProducts.slice(0, displayedItems);
      this.resultMessage.next(this.generateProductMessage(finalProducts.length));
      return finalProducts;
    })
  );

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService
      .listProducts()
      .pipe(take(1))
      .subscribe(response => {
        this.products.next(response.data);
      });
  }

  public addProductsToStore(product: ProductInterface) {
    this.products.next([...this.products.value, product]);
  }

  public updateProductToStore(productToUpdate: ProductInterface) {
    const products = this.products.value.map(product => {
      if (product.id === productToUpdate.id) {
        return productToUpdate;
      }
      return product;
    });

    this.products.next(products);
  }

  private generateProductMessage(products: number): string {
    if (products === 0) {
      return 'Sin resultados';
    }

    if (products === 1) {
      return '1 resultado';
    }

    return `${products} resultados`;
  }

  updateDisplayedItems(displayedItems: number) {
    this.displayedItemsCount.next(displayedItems);
  }

  search(searchValue: string) {
    this.searchValue.next(searchValue);
  }

  getProductById(productId: string): Observable<ProductInterface> {
    const product = this.products.value.find(product => product.id === productId);

    if (!product) {
      return this.productService.loadProductById(productId).pipe(
        catchError(error => {
          return throwError(new Error(error.message));
        })
      );
    }

    return of(product);
  }

  deleteProductOnStore(productId: string): void {
    const products = this.products.value.filter(product => product.id !== productId);
    this.products.next(products);
  }
}
