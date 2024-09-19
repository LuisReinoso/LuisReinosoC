import { TestBed } from '@angular/core/testing';
import { ListProductPageService } from './list-product-page.service';
import { ListProductService } from '@app/core/services/list-product.service';
import { RegisterProductPageService } from '../register-product-page/register-product-page.service';
import { ContextMenuService } from '@app/shared/context-menu/context-menu.service';
import { DialogService } from '@app/shared/dialog/dialog.service';
import { of } from 'rxjs';

describe('ListProductPageService', () => {
  let service: ListProductPageService;
  let listProductService: ListProductService;
  let contextMenuService: ContextMenuService;
  let dialogService: DialogService;
  let registerProductPageService: RegisterProductPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListProductPageService,
        {
          provide: ListProductService,
          useValue: {
            updateDisplayedItems: jest.fn(),
            search: jest.fn(),
            products$: of([]),
            resultMessage$: of(''),
            loadProducts: jest.fn(),
          },
        },
        {
          provide: ContextMenuService,
          useValue: {
            setPosition: jest.fn(),
            open: jest.fn(),
            close: jest.fn(),
          },
        },
        {
          provide: DialogService,
          useValue: {
            close: jest.fn(),
            open: jest.fn(),
          },
        },
        {
          provide: RegisterProductPageService,
          useValue: {
            deleteProduct: jest.fn(),
          },
        },
      ],
    });

    listProductService = TestBed.inject(ListProductService);
    contextMenuService = TestBed.inject(ContextMenuService);
    dialogService = TestBed.inject(DialogService);
    registerProductPageService = TestBed.inject(RegisterProductPageService);
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

  it('should call openMenu and set selected product ID', () => {
    const event = { dataId: '123', x: 10, y: 20 };

    service.openMenu(event);

    expect(contextMenuService.setPosition).toHaveBeenCalledWith(10, 20);
    expect(contextMenuService.open).toHaveBeenCalled();
  });

  it('should call closeDialog on DialogService when called', () => {
    service.closeDialog();

    expect(dialogService.close).toHaveBeenCalled();
  });

  it('should call openDeleteDialog on DialogService when called', () => {
    service.openDeleteDialog();

    expect(dialogService.open).toHaveBeenCalled();
  });

  it('should call deleteProduct of RegisterProductPageService with selected product ID', () => {
    const productId = '123';
    service.openMenu({dataId: productId, x: 10, y: 20});
    service.deleteProduct();

    expect(registerProductPageService.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('should clear selected product id', (done) => {
    const productId = '123';
    service.openMenu({dataId: productId, x: 10, y: 20});

    service.clearProductId();

    service.selectedProductId$.subscribe(product => {
      expect(product).toBe("");
      done();
    })
  })

  it('should call context menu', () => {
    service.closeContextMenu();

    expect(contextMenuService.close).toHaveBeenCalled();
  })
});
