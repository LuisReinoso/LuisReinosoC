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

  it('should call search from listProductPageService', () => {
    component.search('');

    expect(listProductPageService.search).toHaveBeenCalledWith('');
  });

  it('should call search from listProductPageService', () => {
    component.updateDisplayedItems(10);

    expect(listProductPageService.updateDisplayedItems).toHaveBeenCalledWith(10);
  });
});
