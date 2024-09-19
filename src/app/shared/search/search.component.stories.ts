import type { Meta, StoryObj } from '@storybook/angular';
import { SearchComponent } from './search.component';

const meta: Meta<SearchComponent> = {
  component: SearchComponent,
};

export default meta;
type Story = StoryObj<SearchComponent>;

export const primary: Story = {
  args: {},
};
