import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '@app/models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: HttpClient, useValue: { post: () => null } }] });
    http = TestBed.inject(HttpClient);
    service = new ProductService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call add product endpoint', () => {
    const postRequestSpy = jest.spyOn(http, 'post');

    const product: ProductInterface = {
      'id': '123',
      'name': 'John',
      'logo': 's',
      'description': '',
      'date_release': new Date(),
      'date_revision': new Date()
    }
    service.addProduct(product);

    expect(postRequestSpy).toHaveBeenCalledWith('/bp/products', product);
  });
});
