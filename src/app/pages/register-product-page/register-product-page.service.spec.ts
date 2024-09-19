import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RegisterProductPageService } from './register-product-page.service';
import { ProductService } from '@app/core/services/product.service';
import { AlertService } from '@app/shared/alert/alert.service';
import { ProductInterface } from '@app/models/product.model';
import { AddProductSuccessAPI, ProductError } from '@app/models/product-api.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertType } from '@app/models/alert.model';

describe('RegisterProductPageService', () => {
  let service: RegisterProductPageService;
  let productServiceMock: jest.Mocked<ProductService>;
  let alertServiceMock: jest.Mocked<AlertService>;

  beforeEach(() => {
    productServiceMock = {
      addProduct: jest.fn(),
      listProducts: jest.fn().mockReturnValue(of()),
    } as unknown as jest.Mocked<ProductService>;
    alertServiceMock = { showAlert: jest.fn() } as unknown as jest.Mocked<AlertService>;

    TestBed.configureTestingModule({
      providers: [
        RegisterProductPageService,
        { provide: ProductService, useValue: productServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
      ],
    });

    service = TestBed.inject(RegisterProductPageService);
  });

  it('should successfully add a product and show success alert', () => {
    const product: ProductInterface = {
      id: '123',
      name: 'John',
      logo: 's',
      description: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const successResponse: AddProductSuccessAPI = {
      data: product,
      message: 'Success message',
    };

    productServiceMock.addProduct.mockReturnValue(of(successResponse));

    service.addProduct(product);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.success,
      message: 'Producto agregado',
      isClosed: false,
    });
  });

  it('should handle duplicate id error and show error alert', () => {
    const product: ProductInterface = {
      id: '123',
      name: 'John',
      logo: 's',
      description: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const errorResponse = new HttpErrorResponse({
      error: { message: ProductError.duplicateId },
      status: 400,
    });

    productServiceMock.addProduct.mockReturnValue(throwError(errorResponse));

    service.addProduct(product);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.error,
      message: 'Identificador de producto ya existe',
      isClosed: false,
    });
  });

  it('should handle generic error and show contact admin alert', () => {
    const product: ProductInterface = {
      id: '123',
      name: 'John',
      logo: 's',
      description: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const errorResponse = new HttpErrorResponse({
      error: { message: 'generic error' },
      status: 400,
    });

    productServiceMock.addProduct.mockReturnValue(throwError(errorResponse));

    service.addProduct(product);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.error,
      message: 'Contactar con el administrador',
      isClosed: false,
    });
  });
});
