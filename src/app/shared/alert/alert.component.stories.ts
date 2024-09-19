import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';
import { AlertType } from '@app/models/alert.model';

const meta: Meta<AlertComponent> = {
  component: AlertComponent,
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const info: Story = {
  args: {
    type: AlertType.info,
    message: 'Info',
    isVisible: true
  },
};

export const error: Story = {
  args: {
    type: AlertType.error,
    message: 'Error',
    isVisible: true
  },
};

export const success: Story = {
  args: {
    type: AlertType.success,
    message: 'Success',
    isVisible: true
  },
};

export const warning: Story = {
  args: {
    type: AlertType.warning,
    message: 'Warning',
    isVisible: true
  },
};
