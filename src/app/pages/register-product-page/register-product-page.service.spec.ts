import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RegisterProductPageService } from './register-product-page.service';
import { ProductService } from '@app/core/services/product.service';
import { AlertService } from '@app/shared/alert/alert.service';
import { ProductInterface } from '@app/models/product.model';
import {
  AddProductSuccessAPI,
  DeleteProductSuccessAPI,
  ProductError,
  UpdateProductsSuccessAPI,
} from '@app/models/product-api.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertType } from '@app/models/alert.model';
import { Router } from '@angular/router';

describe('RegisterProductPageService', () => {
  let service: RegisterProductPageService;
  let productServiceMock: jest.Mocked<ProductService>;
  let alertServiceMock: jest.Mocked<AlertService>;
  let router: Router;

  beforeEach(() => {
    productServiceMock = {
      addProduct: jest.fn(),
      listProducts: jest.fn().mockReturnValue(of()),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;
    alertServiceMock = { showAlert: jest.fn() } as unknown as jest.Mocked<AlertService>;

    TestBed.configureTestingModule({
      providers: [
        RegisterProductPageService,
        { provide: ProductService, useValue: productServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    router = TestBed.inject(Router);
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

  it('should successfully update a product and show success alert', () => {
    const productId = '123';
    const product: ProductInterface = {
      id: productId,
      name: 'Updated Product',
      logo: 'updated_logo.png',
      description: 'Updated description',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const successResponse: UpdateProductsSuccessAPI = {
      data: product,
      message: 'Update successful',
    };

    productServiceMock.updateProduct.mockReturnValue(of(successResponse));

    service.updateProduct(productId, product);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.success,
      message: 'Producto actualizado',
      isClosed: false,
    });
  });

  it('should handle not found update error and show error alert', () => {
    const productId = '123';
    const product: ProductInterface = {
      id: productId,
      name: 'Updated Product',
      logo: 'updated_logo.png',
      description: 'Updated description',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const errorResponse = new HttpErrorResponse({
      error: { message: ProductError.notFoundUpdate },
      status: 404,
    });

    productServiceMock.updateProduct.mockReturnValue(throwError(errorResponse));

    service.updateProduct(productId, product);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.error,
      message: 'Producto a actualizar no existe',
      isClosed: false,
    });
  });

  it('should handle not found update default error and show error alert', () => {
    const productId = '123';
    const product: ProductInterface = {
      id: productId,
      name: 'Updated Product',
      logo: 'updated_logo.png',
      description: 'Updated description',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const errorResponse = new HttpErrorResponse({
      error: { message: 'diferent error' },
      status: 404,
    });

    productServiceMock.updateProduct.mockReturnValue(throwError(errorResponse));

    service.updateProduct(productId, product);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.error,
      message: 'Contactar con el administrador',
      isClosed: false,
    });
  });

  it('should navigate to empty form', () => {
    service.navigateToEmptyForm();

    expect(router.navigate).toHaveBeenCalledWith(['register-product'], { queryParams: {}, replaceUrl: true });
  });

  it('should successfully delete a product and show success alert', () => {
    const productId = '123';

    productServiceMock.deleteProduct.mockReturnValue(of({ message: '' } as DeleteProductSuccessAPI));

    service.deleteProduct(productId);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.success,
      message: 'Producto eliminado',
      isClosed: false,
    });
  });

  it('should handle not found delete error and show error alert', () => {
    const productId = '123';
    const errorResponse = new HttpErrorResponse({
      error: { message: ProductError.notFoundUpdate },
      status: 404,
    });

    productServiceMock.deleteProduct.mockReturnValue(throwError(errorResponse));

    service.deleteProduct(productId);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.error,
      message: 'Producto a eliminar no existe',
      isClosed: false,
    });
  });

  it('should handle generic error on delete and show contact admin alert', () => {
    const productId = '123';
    const errorResponse = new HttpErrorResponse({
      error: { message: 'generic error' },
      status: 400,
    });

    productServiceMock.deleteProduct.mockReturnValue(throwError(errorResponse));

    service.deleteProduct(productId);

    expect(alertServiceMock.showAlert).toHaveBeenCalledWith({
      type: AlertType.error,
      message: 'Contactar con el administrador',
      isClosed: false,
    });
  });
});
