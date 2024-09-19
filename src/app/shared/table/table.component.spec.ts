import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have columnTitle attribute', () => {
    expect(component.columnTitles).toBeDefined();
  });

  it('should have columnNames attribute', () => {
    expect(component.columnNames).toBeDefined();
  });

  it('should have columnInfo attribute', () => {
    expect(component.columnInfo).toBeDefined();
  });

  it('should have data attribute', () => {
    expect(component.data).toBeDefined();
  });

  it('should emit open menu data', () => {
    const openMenuSpy = jest.spyOn(component.openMenu, 'emit');

    component.emitOpenMenu({'x': 10, 'y': 10} as MouseEvent, 'dataId');

    expect(openMenuSpy).toHaveBeenCalledWith({'x': 10, 'y': 10, dataId: 'dataId'});
  })
});
