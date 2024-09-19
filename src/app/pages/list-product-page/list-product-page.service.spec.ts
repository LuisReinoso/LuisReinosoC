import { TestBed } from '@angular/core/testing';
import { ListProductPageService } from './list-product-page.service';
import { ListProductService } from '@app/core/services/list-product.service';

describe('ListProductPageService', () => {
  let service: ListProductPageService;
  let listProductService: ListProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListProductPageService,
        {
          provide: ListProductService,
          useValue: {
            updateDisplayedItems: jest.fn(),
            search: jest.fn(),
            products$: jest.fn(),
            resultMessage$: jest.fn(),
            loadProducts: jest.fn(),
          },
        },
      ],
    });

    listProductService = TestBed.inject(ListProductService);
    service = TestBed.inject(ListProductPageService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should product$ to be defined', () => {
    expect(service.products$).toBeDefined();
  });

  it('should resultMessage$ to be defined', () => {
    expect(service.resultMessage$).toBeDefined();
  });

  it('should call updateDisplayedItems on ListProductService when called', () => {
    service.updateDisplayedItems(10);

    expect(listProductService.updateDisplayedItems).toHaveBeenCalledWith(10);
  });

  it('should call search on ListProductService when called', () => {
    service.search('test');

    expect(listProductService.search).toHaveBeenCalledWith('test');
  });
});
