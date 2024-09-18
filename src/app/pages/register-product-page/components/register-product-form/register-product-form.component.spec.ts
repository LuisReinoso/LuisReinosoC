import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductFormComponent } from './register-product-form.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isRevisionDateOneYearLaterValidator, isTodayOrFutureDateValidator } from './validators/date.validator';
import { ProductInterface } from '../../../models/product.model';

describe('RegisterProductFormComponent', () => {
  let component: RegisterProductFormComponent;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProductFormComponent],
      providers: [FormBuilder],
    });

    fb = TestBed.inject(FormBuilder);
    component = new RegisterProductFormComponent(fb);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined formValue output', () => {
    expect(component.formValue).toBeDefined();
  });

  it('should have defined form with validators', () => {
    const controls = component.form.controls;

    expect(hasValidator(controls['id'], Validators.required)).toBe(true);
    expect(hasValidator(controls['id'], Validators.minLength(3))).toBe(true);
    expect(hasValidator(controls['id'], Validators.maxLength(10))).toBe(true);

    expect(hasValidator(controls['name'], Validators.required)).toBe(true);
    expect(hasValidator(controls['name'], Validators.minLength(5))).toBe(true);
    expect(hasValidator(controls['name'], Validators.maxLength(100))).toBe(true);

    expect(hasValidator(controls['description'], Validators.required)).toBe(true);
    expect(hasValidator(controls['description'], Validators.minLength(10))).toBe(true);
    expect(hasValidator(controls['description'], Validators.maxLength(200))).toBe(true);

    expect(hasValidator(controls['logo'], Validators.required)).toBe(true);

    expect(hasValidator(controls['date_release'], Validators.required)).toBe(true);
    expect(hasValidator(controls['date_release'], isTodayOrFutureDateValidator)).toBe(true);

    expect(hasValidator(controls['date_revision'], Validators.required)).toBe(true);
    expect(
      hasValidator(controls['date_revision'], isRevisionDateOneYearLaterValidator.bind(null, 'date_release'))
    ).toBe(true);
  });

  it('should reset form after call reset form function', () => {
    const formSpy = jest.spyOn(component.form, 'reset');

    component.resetForm();

    expect(formSpy).toHaveBeenCalled();
  });

  it('should reset form after call reset form function', () => {
    const formSpy = jest.spyOn(component.form, 'reset');

    component.resetForm();

    expect(formSpy).toHaveBeenCalled();
  });

  it('should emit form if is valid', () => {
    const formValueSpy = jest.spyOn(component.formValue, 'emit');
    const currentDate = new Date('2025-01-01');
    const oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(currentDate.getFullYear() + 1);

    const formValue = {
      id: '1000',
      date_release: currentDate,
      date_revision: oneYearLater,
      description: 'test description',
      logo: 'test logo',
      name: 'test name',
    } as ProductInterface;

    component.form.setValue(formValue);

    component.emitForm();
    expect(formValueSpy).toHaveBeenCalledWith(formValue);
  });
});

function hasValidator(control: AbstractControl, validator: Function): boolean {
  const validators = control.validator ? [control.validator] : [];
  return validators.some(v => {
    const validatorFn = v(control);
    return validatorFn && validatorFn.hasOwnProperty('required');
  });
}
