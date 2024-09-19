import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined the data input', () => {
    expect(component.data).toBeDefined();
  });

  it('should emit the value on when emit select change', () => {
    const selectionChangeSpy = jest.spyOn(component.selectionChange, 'emit');

    component.emitSelectChange(5);

    expect(selectionChangeSpy).toHaveBeenCalledWith(5);
  });
});
