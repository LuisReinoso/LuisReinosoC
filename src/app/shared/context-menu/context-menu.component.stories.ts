import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuService } from './context-menu.service';
import { of } from 'rxjs';

const mockContextMenuService = {
  open: () => {},
  close: () => {},
  position$: of({ x: 40, y: 53 }),
  isOpen$: of(true),
};

const mockContextMenuServiceClosed = {
  open: () => {},
  close: () => {},
  position$: of({ x: 40, y: 53 }),
  isOpen$: of(false),
};

const meta: Meta<ContextMenuComponent> = {
  component: ContextMenuComponent,
};

export default meta;
type Story = StoryObj<ContextMenuComponent>;

export const menuOpened: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ContextMenuService,
          useValue: mockContextMenuService,
        },
      ],
    }),
  ],
  render: () => ({
    template: `
      <button class="btn btn--primary">Click to Open Context Menu</button>
      <app-context-menu>
        <div class="context-menu__item">Item 1</div>
      </app-context-menu>
    `,
  }),
};

export const menuClosed: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ContextMenuService,
          useValue: mockContextMenuServiceClosed,
        },
      ],
    }),
  ],
  render: () => ({
    template: `
      <button class="btn btn--primary">Click to Open Context Menu</button>
      <app-context-menu>
        <div class="context-menu__item">Item 1</div>
      </app-context-menu>
    `,
  }),
};
