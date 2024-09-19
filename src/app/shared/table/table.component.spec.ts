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
});
