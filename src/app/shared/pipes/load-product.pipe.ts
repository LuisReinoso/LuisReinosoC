import { Pipe, PipeTransform } from '@angular/core';
import { ListProductService } from '@app/core/services/list-product.service';
import { ProductInterface } from '@app/models/product.model';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'loadProduct',
  standalone: true,
})
export class LoadProductPipe implements PipeTransform {
  constructor(private listProductService: ListProductService) {}

  transform(productId: ProductInterface['id'] | null): Observable<ProductInterface | null> {
    if (!productId) {
      return of(null);
    }

    return this.listProductService.getProductById(productId);
  }
}
