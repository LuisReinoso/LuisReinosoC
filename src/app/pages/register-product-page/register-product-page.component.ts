import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterProductFormComponent } from './components/register-product-form/register-product-form.component';
import { ProductInterface } from '@app/models/product.model';
import { RegisterProductPageService } from './register-product-page.service';

@Component({
  standalone: true,
  imports: [RegisterProductFormComponent],
  templateUrl: './register-product-page.component.html',
  styleUrl: './register-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterProductPageComponent {
  constructor(private registerProductPageService: RegisterProductPageService) {}

  addProduct(product: ProductInterface) {
    this.registerProductPageService.addProduct(product);
  }
}
