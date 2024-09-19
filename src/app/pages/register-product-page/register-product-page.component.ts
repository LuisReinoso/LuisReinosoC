import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RegisterProductFormComponent } from './components/register-product-form/register-product-form.component';
import { ProductInterface } from '@app/models/product.model';
import { RegisterProductPageService } from './register-product-page.service';
import { LoadProductPipe } from '@app/shared/pipes/load-product.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [RegisterProductFormComponent, LoadProductPipe, AsyncPipe],
  templateUrl: './register-product-page.component.html',
  styleUrl: './register-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterProductPageComponent {
  @Input() id: ProductInterface['id'] = '';

  constructor(private registerProductPageService: RegisterProductPageService) {}

  registerProductFormValue(product: ProductInterface) {
    if (this.id) {
      this.registerProductPageService.updateProduct(this.id, product);
      return;
    }
    this.registerProductPageService.addProduct(product);
  }

  navigateToEmptyForm() {
    this.registerProductPageService.navigateToEmptyForm();
  }
}
