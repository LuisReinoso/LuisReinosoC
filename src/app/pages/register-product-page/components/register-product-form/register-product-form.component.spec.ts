import { TestBed } from '@angular/core/testing';

import { RegisterProductFormComponent } from './register-product-form.component';
import { FormBuilder } from '@angular/forms';
import { ProductInterface } from '@app/models/product.model';
import { ProductService } from '@app/core/services/product.service';
import { of } from 'rxjs';

describe('RegisterProductFormComponent', () => {
  let component: RegisterProductFormComponent;
  let fb: FormBuilder;
  let productService: ProductService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RegisterProductFormComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: { checkIfProductExists: jest.fn().mockReturnValue(of(null)) } },
      ],
    });

    fb = TestBed.inject(FormBuilder);
    productService = TestBed.inject(ProductService);
    component = new RegisterProductFormComponent(fb, productService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined formValue output', () => {
    expect(component.formValue).toBeDefined();
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

  it('should emit reset when call reset function', () => {
    const resetSpy = jest.spyOn(component.reset, 'emit');

    component.emitReset();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should load product if id and product exist', () => {
    const formSpy = jest.spyOn(component.form, 'setValue');
    component.id = '10';
    component.product = {
      id: '10',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    };

    component.loadProduct();

    expect(formSpy).toHaveBeenCalled();
  });

  it('should not load product if not id and product exist', () => {
    const formSpy = jest.spyOn(component.form, 'setValue');
    component.id = null as any;
    component.product = {
      id: '10',
      name: '',
      description: '',
      logo: '',
      date_release: new Date(),
      date_revision: new Date(),
    };

    component.loadProduct();

    expect(formSpy).not.toHaveBeenCalled();
  });

  it('should not load product if id exist but product do not exist', () => {
    const formSpy = jest.spyOn(component.form, 'setValue');
    component.id = '10';
    component.product = null

    component.loadProduct();

    expect(formSpy).not.toHaveBeenCalled();
  });

  it('should set product on call setProduct function', () => {
    component.setProduct = {'id': 'test'} as ProductInterface;

    expect(component.product).toStrictEqual({'id': 'test'})
  })

  it('should execute loadProduct on call onInit function', () => {
    const loadProductSpy = jest.spyOn(component, 'loadProduct');

    component.ngOnInit();

    expect(loadProductSpy).toHaveBeenCalled();
  })
});
