import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const primary: Story = {
  args: {
    color: 'primary',
    label: 'Enviar',
    disabled: false
  },
};

export const primaryDisabled: Story = {
  args: {
    color: 'primary',
    label: 'Enviar',
    disabled: true
  },
};

export const secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Reiniciar',
    disabled: false
  },
};

export const secondaryDisabled: Story = {
  args: {
    color: 'secondary',
    label: 'Reiniciar',
    disabled: true
  },
};
