import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductPageComponent } from './register-product-page.component';
import { ProductService } from '@app/core/services/product.service';

describe('RegisterProductPageComponent', () => {
  let component: RegisterProductPageComponent;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProductPageComponent],
      providers: [{provide: ProductService, useValue: {}}]
    })

    productService = TestBed.inject(ProductService);
    component = new RegisterProductPageComponent(productService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
