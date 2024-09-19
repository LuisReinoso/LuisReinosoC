import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { of } from 'rxjs';

const meta: Meta<DialogComponent> = {
  component: DialogComponent,
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const simpleDialog: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: DialogService,
          useValue: {isVisible$: of(true)},
        },
      ],
    }),
  ],
  render: () => ({
    template: `
      <app-dialog>
        <button class="btn btn--primary">Button inside dialog</button>
      </app-dialog>
    `,
  }),
};
