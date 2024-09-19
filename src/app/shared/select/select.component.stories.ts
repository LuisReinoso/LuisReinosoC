import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  component: SelectComponent,
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const basic: Story = {
  args: {
    data: [5, 10, 15, 50, 100]
  },
};
