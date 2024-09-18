import type { Meta, StoryObj } from '@storybook/angular';
import { RegisterProductFormComponent } from './register-product-form.component';

const meta: Meta<RegisterProductFormComponent> = {
  component: RegisterProductFormComponent,
};

export default meta;
type Story = StoryObj<RegisterProductFormComponent>;

export const form: Story = {
  args: {},
};
