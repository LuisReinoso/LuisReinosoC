import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterProductFormComponent } from './components/register-product-form/register-product-form.component';
import { ProductInterface } from '@app/models/product.model';
import { ProductService } from '@app/core/services/product.service';

@Component({
  standalone: true,
  imports: [RegisterProductFormComponent],
  templateUrl: './register-product-page.component.html',
  styleUrl: './register-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterProductPageComponent {
  constructor(public productService: ProductService) {}

  addProduct(product: ProductInterface) {
    this.productService.addProduct(product).subscribe(result => {
      console.log(result);
    });
  }
}
