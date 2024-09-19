import { AbstractControl } from '@angular/forms';
import { ProductService } from '@app/core/services/product.service';
import { Observable, of, throwError } from 'rxjs';
import { productExistsValidator } from './product-id.validator';

describe('ProductExistsValidator', () => {
  let productService = { checkIfProductExists: jest.fn() };

  it('should return null if control value is empty', done => {
    const validator = productExistsValidator(productService as unknown as ProductService);
    const control = { value: '' } as AbstractControl;

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return { productExists: true } if product exists', done => {
    productService.checkIfProductExists.mockReturnValue(of(true));
    const validator = productExistsValidator(productService as unknown as ProductService);
    const control = { value: 'existing-product-id' } as AbstractControl;

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toEqual({ productExists: true });
      done();
    });
  });

  it('should return null if product does not exist', done => {
    productService.checkIfProductExists.mockReturnValue(of(false));
    const validator = productExistsValidator(productService as unknown as ProductService);
    const control = { value: 'non-existing-product-id' } as AbstractControl;

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return null on error', done => {
    productService.checkIfProductExists.mockReturnValue(throwError(() => new Error('Error')));
    const validator = productExistsValidator(productService as unknown as ProductService);
    const control = { value: 'any-product-id' } as AbstractControl;

    (validator(control) as Observable<any>).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});
