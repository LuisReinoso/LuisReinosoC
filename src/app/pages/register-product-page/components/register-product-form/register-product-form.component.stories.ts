import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RegisterProductFormComponent } from './register-product-form.component';
import { ProductService } from '@app/core/services/product.service';

const meta: Meta<RegisterProductFormComponent> = {
  component: RegisterProductFormComponent,
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ProductService,
          useValue: {},
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<RegisterProductFormComponent>;

export const form: Story = {
  args: {},
};
