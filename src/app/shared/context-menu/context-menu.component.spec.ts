import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuService } from './context-menu.service';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let contextMenuService: ContextMenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ContextMenuService, useValue: { position$: jest.fn(), isOpen$: jest.fn(), close: jest.fn() } },
      ],
      imports: [ContextMenuComponent],
    });

    contextMenuService = TestBed.inject(ContextMenuService);
    component = new ContextMenuComponent(contextMenuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined position$', () => {
    expect(component.position$).toBeDefined();
  });

  it('should have defined isOpen$', () => {
    expect(component.isOpen$).toBeDefined();
  });

  it('should call close from context menu service', () => {
    component.closeMenu();
    expect(contextMenuService.close).toHaveBeenCalled();
  });

  it('should call close from context menu service if click out of context menu', () => {
    const event = {
      target: { tagName: '', closest: jest.fn().mockReturnValue(null) },
    };

    component.onClickOutside(event as unknown as MouseEvent);

    expect(contextMenuService.close).toHaveBeenCalled();
  });

  it('should not call close from context menu service if click in button', () => {
    const event = {
      target: { tagName: 'BUTTON', closest: jest.fn().mockReturnValue(null) },
    };

    component.onClickOutside(event as unknown as MouseEvent);

    expect(contextMenuService.close).not.toHaveBeenCalled();
  });
});
