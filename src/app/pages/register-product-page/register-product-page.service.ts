import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from '@app/core/services/product.service';
import { AlertType } from '@app/models/alert.model';
import { AddProductErrorAPI, AddProductSuccessAPI, ProductError } from '@app/models/product-api.model';
import { ProductInterface } from '@app/models/product.model';
import { AlertService } from '@app/shared/alert/alert.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterProductPageService {
  constructor(public productService: ProductService, private alertService: AlertService) {}

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
        this.alertService.showAlert({ type: AlertType.success, message: 'Producto agregado', isClosed: false });
      });
  }
}
