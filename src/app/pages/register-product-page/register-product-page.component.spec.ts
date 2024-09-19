import { TestBed } from '@angular/core/testing';

import { RegisterProductPageComponent } from './register-product-page.component';
import { RegisterProductPageService } from './register-product-page.service';
import { ProductInterface } from '@app/models/product.model';

describe('RegisterProductPageComponent', () => {
  let component: RegisterProductPageComponent;
  let registerProductPageService: RegisterProductPageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProductPageComponent],
      providers: [
        {
          provide: RegisterProductPageService,
          useValue: { addProduct: () => null, updateProduct: () => null, navigateToEmptyForm: jest.fn() },
        },
      ],
    });

    registerProductPageService = TestBed.inject(RegisterProductPageService);
    component = new RegisterProductPageComponent(registerProductPageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the addProduct method', () => {
    const addProductSpy = jest.spyOn(registerProductPageService, 'addProduct');
    const product: ProductInterface = {
      id: '123',
      name: 'John',
      logo: 's',
      description: '',
      date_release: new Date(),
      date_revision: new Date(),
    };

    component.registerProductFormValue(product);

    expect(addProductSpy).toHaveBeenCalledWith(product);
  });

  it('should call the updatedProduct method', () => {
    const productId = '111';
    component.id = productId;

    const updateProductSpy = jest.spyOn(registerProductPageService, 'updateProduct');
    const product: ProductInterface = {
      id: productId,
      name: 'John',
      logo: 's',
      description: '',
      date_release: new Date(),
      date_revision: new Date(),
    };

    component.registerProductFormValue(product);

    expect(updateProductSpy).toHaveBeenCalledWith(productId, product);
  });

  it('should call navigateToEmptyForm from registerProductPageService', () => {
    component.navigateToEmptyForm();

    expect(registerProductPageService.navigateToEmptyForm).toHaveBeenCalled();
  });
});
