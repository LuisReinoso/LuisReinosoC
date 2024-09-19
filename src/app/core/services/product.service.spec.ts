import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '@app/models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: { post: () => null, get: () => null, put: () => null, delete: () => null } },
      ],
    });
    http = TestBed.inject(HttpClient);
    service = new ProductService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call add product endpoint', () => {
    const postRequestSpy = jest.spyOn(http, 'post');

    const product: ProductInterface = {
      id: '123',
      name: 'John',
      logo: 's',
      description: '',
      date_release: new Date(),
      date_revision: new Date(),
    };
    service.addProduct(product);

    expect(postRequestSpy).toHaveBeenCalledWith('/bp/products', product);
  });

  it('should call list product endpoint', () => {
    const getRequestSpy = jest.spyOn(http, 'get');

    service.listProducts();

    expect(getRequestSpy).toHaveBeenCalledWith('/bp/products');
  });

  it('should call check if product exist endpoint', () => {
    const getRequestSpy = jest.spyOn(http, 'get');

    service.checkIfProductExists('1');

    expect(getRequestSpy).toHaveBeenCalledWith('/bp/products/verification/1');
  });

  it('should call load product by id endpoint', () => {
    const getRequestSpy = jest.spyOn(http, 'get');

    service.loadProductById('111');

    expect(getRequestSpy).toHaveBeenCalledWith('/bp/products/111');
  });

  it('should call update product endpoint', () => {
    const putRequestSpy = jest.spyOn(http, 'put');

    service.updateProduct('111', {} as ProductInterface);

    expect(putRequestSpy).toHaveBeenCalledWith('/bp/products/111', {});
  });

  it('should call delete product endpoint', () => {
    const deleteRequestSpy = jest.spyOn(http, 'delete');

    service.deleteProduct('111');

    expect(deleteRequestSpy).toHaveBeenCalledWith('/bp/products/111');
  });
});
