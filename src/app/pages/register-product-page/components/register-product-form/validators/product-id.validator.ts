import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ProductService } from '@app/core/services/product.service';
import { catchError, map, Observable, of } from 'rxjs';

export function productExistsValidator(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return productService.checkIfProductExists(control.value).pipe(
      map(exists => (exists ? { productExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
