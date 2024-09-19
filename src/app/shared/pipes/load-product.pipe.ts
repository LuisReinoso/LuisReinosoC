import { Pipe, PipeTransform } from '@angular/core';
import { ListProductService } from '@app/core/services/list-product.service';
import { ProductInterface } from '@app/models/product.model';
import { catchError, Observable, of } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { AlertType } from '@app/models/alert.model';
import { ActivatedRoute, Router } from '@angular/router';

@Pipe({
  name: 'loadProduct',
  standalone: true,
})
export class LoadProductPipe implements PipeTransform {
  constructor(
    private listProductService: ListProductService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  transform(productId: ProductInterface['id'] | null): Observable<ProductInterface | null> {
    if (!productId) {
      return of(null);
    }

    return this.listProductService.getProductById(productId).pipe(
      catchError(() => {
        this.alertService.showAlert({
          isClosable: true,
          message: 'Producto no encontrado',
          type: AlertType.error,
          isClosed: false,
        });

        if ('id' in this.route.snapshot.params ) {
          this.router.navigate(['register-product'], { queryParams: {}, replaceUrl: true });
        }

        return of(null);
      })
    );
  }
}
