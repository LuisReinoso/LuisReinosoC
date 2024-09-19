import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductPageComponent } from './list-product-page.component';
import { ListProductPageService } from './list-product-page.service';

describe('ListProductPageComponent', () => {
  let component: ListProductPageComponent;
  let listProductPageService: ListProductPageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ListProductPageService,
          useValue: {
            search: jest.fn(),
            updateDisplayedItems: jest.fn(),
            products$: jest.fn(),
            resultMessage$: jest.fn(),
            openMenu: jest.fn(),
            clearProductId: jest.fn(),
            closeDialog: jest.fn(),
            openDeleteDialog: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
      imports: [ListProductPageComponent],
    });

    listProductPageService = TestBed.inject(ListProductPageService);
    component = new ListProductPageComponent(listProductPageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined columnTitles', () => {
    expect(component.columnTitles).toBeDefined();
  });

  it('should have defined columnNames', () => {
    expect(component.columnNames).toBeDefined();
  });

  it('should have defined columnInfo', () => {
    expect(component.columnInfo).toBeDefined();
  });

  it('should have defined product$', () => {
    expect(component.products$).toBeDefined();
  });

  it('should have defined resultMessage$', () => {
    expect(component.resultMessage$).toBeDefined();
  });

  it('should have select options as 5, 10, 20', () => {
    expect(component.selectOptions).toStrictEqual([5, 10, 20]);
  });

  it('should call search from listProductPageService', () => {
    component.search('');

    expect(listProductPageService.search).toHaveBeenCalledWith('');
  });

  it('should call search from listProductPageService', () => {
    component.updateDisplayedItems(10);

    expect(listProductPageService.updateDisplayedItems).toHaveBeenCalledWith(10);
  });

  it('should call openMenu from listProductPageService', () => {
    const event = { dataId: '', x: 0, y: 0 };

    component.openMenu(event);

    expect(listProductPageService.openMenu).toHaveBeenCalledWith(event);
  });

  it('should call clearProductId from listProductPageService', () => {
    component.clearProductId();

    expect(listProductPageService.clearProductId).toHaveBeenCalled();
  });

  it('should call openDeleteDialog from listProductPageService', () => {
    component.openDeleteDialog();

    expect(listProductPageService.openDeleteDialog).toHaveBeenCalled();
  });

  it('should call deleteProduct from listProductPageService', () => {
    component.deleteProduct();

    expect(listProductPageService.deleteProduct).toHaveBeenCalled();
  });

  it('should call closeDialog from listProductPageService', () => {
    component.closeDialog();

    expect(listProductPageService.closeDialog).toHaveBeenCalled();
  });
});
