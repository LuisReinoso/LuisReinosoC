import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const header: Story = {
  args: {},
};
