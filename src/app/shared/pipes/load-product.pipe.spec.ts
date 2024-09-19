import { TestBed } from '@angular/core/testing';
import { LoadProductPipe } from './load-product.pipe';
import { ListProductService } from '@app/core/services/list-product.service';
import { of } from 'rxjs';
import { ProductInterface } from '@app/models/product.model';

describe('LoadProductPipe', () => {
  let pipe: LoadProductPipe;
  let listProductService: jest.Mocked<ListProductService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadProductPipe,
        {
          provide: ListProductService,
          useValue: {
            getProductById: jest.fn().mockReturnValue(of()),
          },
        },
      ],
    });

    listProductService = TestBed.inject(ListProductService) as jest.Mocked<ListProductService>;
    pipe = TestBed.inject(LoadProductPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null observable when no productId is provided', done => {
    const result = pipe.transform(null as any);
    result.subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('should return product observable from the service when productId is provided', done => {
    const product = { id: '123', name: 'Test Product' } as ProductInterface;
    listProductService.getProductById.mockReturnValue(of(product));

    const result = pipe.transform('123');
    result.subscribe(value => {
      expect(value).toEqual(product);
      done();
    });
  });
});
