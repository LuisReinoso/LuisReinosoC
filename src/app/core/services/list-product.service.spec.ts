import { TestBed } from '@angular/core/testing';
import { ListProductService } from './list-product.service';
import { ProductService } from './product.service';
import { of, take } from 'rxjs';
import { ProductInterface } from '@app/models/product.model';

describe('ListProductService', () => {
  let service: ListProductService;
  let productServiceMock: jest.Mocked<ProductService>;
  const productA: ProductInterface = {
    id: '123',
    name: 'apple',
    logo: 's',
    description: '',
    date_release: new Date(),
    date_revision: new Date(),
  } as ProductInterface;
  const productB: ProductInterface = {
    id: '1234',
    name: 'test',
    logo: 's',
    description: '',
    date_release: new Date(),
    date_revision: new Date(),
  } as ProductInterface;

  beforeEach(() => {
    productServiceMock = {
      loadProducts: jest.fn(),
      listProducts: jest.fn().mockReturnValue(of({ data: [] })),
      loadProductById: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<ProductService>;

    TestBed.configureTestingModule({
      providers: [ListProductService, { provide: ProductService, useValue: productServiceMock }],
    });

    service = TestBed.inject(ListProductService);
    service.updateDisplayedItems(100);
  });

  it('should load products on initialization', done => {
    expect(productServiceMock.listProducts).toHaveBeenCalled();

    service.products$.pipe(take(1)).subscribe(products => {
      expect(products).toEqual([]);
      done();
    });
  });

  it('should add new products to the store', done => {
    service.addProductsToStore(productA);
    service.addProductsToStore(productB);

    service.products$.pipe(take(1)).subscribe(products => {
      expect(products).toEqual([productA, productB]);
      done();
    });
  });

  it('should filter products based on search value', done => {
    service.addProductsToStore(productA);
    service.addProductsToStore(productB);

    service.search('apple');

    service.products$.pipe(take(1)).subscribe(products => {
      expect(products).toEqual([productA]);
      done();
    });
  });

  it('should generate correct result messages for one result', done => {
    service.addProductsToStore(productA);
    service.search('');
    service.updateDisplayedItems(100);

    service.products$.subscribe();

    service.resultMessage$.pipe(take(1)).subscribe(messages => {
      console.log(messages);
      expect(messages).toBe('1 resultado');
      done();
    });
  });

  it('should generate correct result messages for zero results', done => {
    service.search('');
    service.updateDisplayedItems(100);

    service.products$.subscribe();

    service.resultMessage$.pipe(take(1)).subscribe(messages => {
      expect(messages).toBe('Sin resultados');
      done();
    });
  });

  it('should generate correct result messages for three results', done => {
    service.addProductsToStore(productA);
    service.addProductsToStore(productA);
    service.addProductsToStore(productA);
    service.search('');
    service.updateDisplayedItems(100);

    service.products$.subscribe();

    service.resultMessage$.pipe(take(1)).subscribe(messages => {
      expect(messages).toBe('3 resultados');
      done();
    });
  });

  it('should update products on store', done => {
    service.addProductsToStore(productA);
    service.updateProductToStore({ ...productA, name: 'fruit' });

    service.products$.subscribe(products => {
      const product = products[0];
      expect(product.name).toBe('fruit');
      done();
    });
  });

  it('should get product from by id from store', done => {
    service.addProductsToStore(productA);

    service.getProductById('123').subscribe(product => {
      expect(product.name).toBe('apple');
      done();
    });
  });

  it('should get product from by loadProductById function', done => {
    service.getProductById('123').subscribe(() => {
      expect(productServiceMock.loadProductById).toHaveBeenCalled();
      done();
    });
  });

  it('should delete product from store', done => {
    service.addProductsToStore(productA);

    service.deleteProductOnStore('123');

    service.products$.subscribe(products => {
      expect(products.length).toBe(0);
      done();
    });
  });

  it('should update product to store', done => {
    service.addProductsToStore(productA);
    service.addProductsToStore(productB);

    service.updateProductToStore({...productA, 'name': 'new apple'});

    service.products$.subscribe(products => {
      expect(products.length).toBe(2);
      done();
    });
  });
});
