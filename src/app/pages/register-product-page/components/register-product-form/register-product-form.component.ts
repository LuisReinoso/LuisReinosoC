import { JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isRevisionDateOneYearLaterValidator, isTodayOrFutureDateValidator } from './validators/date.validator';
import { ButtonComponent } from '@app/shared/button/button.component';
import { productExistsValidator } from './validators/product-id.validator';
import { ProductService } from '@app/core/services/product.service';
import { ProductInterface } from '@app/models/product.model';

@Component({
  selector: 'app-register-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ButtonComponent, JsonPipe],
  templateUrl: './register-product-form.component.html',
  styleUrl: './register-product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterProductFormComponent implements OnInit {
  @Input() id: ProductInterface['id'] = '';
  @Input('product') set setProduct(product: ProductInterface) {
    this.product = product;
    this.loadProduct();
  }
  product: ProductInterface | null = null;
  @Output() formValue = new EventEmitter();
  @Output() reset = new EventEmitter();

  form: FormGroup = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      [productExistsValidator(this.productService)],
    ],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', [Validators.required, isTodayOrFutureDateValidator]],
    date_revision: ['', [Validators.required, isRevisionDateOneYearLaterValidator('date_release')]],
  });

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  resetForm() {
    this.form.reset();
  }

  emitForm() {
    if (this.form.valid) {
      this.formValue.emit(this.form.value);
    }
  }

  emitReset() {
    this.reset.emit();
  }

  loadProduct() {
    if (this.id && this.product) {
      this.form.controls['id'].setValue(this.id);
      this.form.controls['id'].disable();
      this.form.setValue(this.product);
    }
  }
}
