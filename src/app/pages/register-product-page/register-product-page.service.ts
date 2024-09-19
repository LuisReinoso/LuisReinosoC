import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ListProductService } from '@app/core/services/list-product.service';
import { ProductService } from '@app/core/services/product.service';
import { AlertType } from '@app/models/alert.model';
import {
  AddProductErrorAPI,
  AddProductSuccessAPI,
  DeleteProductsErrorAPI,
  ProductError,
  UpdateProductsErrorAPI,
  UpdateProductsSuccessAPI,
} from '@app/models/product-api.model';
import { ProductInterface } from '@app/models/product.model';
import { AlertService } from '@app/shared/alert/alert.service';
import { DialogService } from '@app/shared/dialog/dialog.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterProductPageService {
  constructor(
    public productService: ProductService,
    private alertService: AlertService,
    private router: Router,
    private listProductService: ListProductService,
    private dialogService: DialogService
  ) {}

  addProduct(product: ProductInterface) {
    this.productService
      .addProduct(product)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const error: AddProductErrorAPI = errorResponse.error;
          let errorMessage = '';

          switch (error.message) {
            case ProductError.duplicateId:
              errorMessage = 'Identificador de producto ya existe';
              break;
            default:
              errorMessage = 'Contactar con el administrador';
              break;
          }

          this.alertService.showAlert({ type: AlertType.error, message: errorMessage, isClosed: false });
          return EMPTY;
        })
      )
      .subscribe((product: AddProductSuccessAPI) => {
        this.listProductService.addProductsToStore(product.data);
        this.alertService.showAlert({ type: AlertType.success, message: 'Producto agregado', isClosed: false });
        this.router.navigate(['']);
      });
  }

  updateProduct(id: string, product: ProductInterface) {
    this.productService
      .updateProduct(id, product)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const error: UpdateProductsErrorAPI = errorResponse.error;
          let errorMessage = '';

          switch (error.message) {
            case ProductError.notFoundUpdate:
              errorMessage = 'Producto a actualizar no existe';
              break;
            default:
              errorMessage = 'Contactar con el administrador';
              break;
          }

          this.alertService.showAlert({ type: AlertType.error, message: errorMessage, isClosed: false });
          return EMPTY;
        })
      )
      .subscribe((productResponse: UpdateProductsSuccessAPI) => {
        this.listProductService.updateProductToStore({ ...productResponse.data, id });
        this.alertService.showAlert({ type: AlertType.success, message: 'Producto actualizado', isClosed: false });
        this.router.navigate(['']);
      });
  }

  navigateToEmptyForm() {
    this.router.navigate(['register-product'], { queryParams: {}, replaceUrl: true });
  }

  deleteProduct(productId: ProductInterface['id']) {
    this.productService
      .deleteProduct(productId)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const error: DeleteProductsErrorAPI = errorResponse.error;
          let errorMessage = '';

          switch (error.message) {
            case ProductError.notFoundUpdate:
              errorMessage = 'Producto a eliminar no existe';
              break;
            default:
              errorMessage = 'Contactar con el administrador';
              break;
          }

          this.alertService.showAlert({ type: AlertType.error, message: errorMessage, isClosed: false });
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.listProductService.deleteProductOnStore(productId);
        this.dialogService.close();
        this.alertService.showAlert({ type: AlertType.success, message: 'Producto eliminado', isClosed: false });
      });
  }
}
