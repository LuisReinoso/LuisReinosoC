import { TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
import { of } from 'rxjs';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: DialogService, useValue: { isVisible$: of(true) } }],
      imports: [DialogComponent],
    });

    dialogService = TestBed.inject(DialogService);
    component = new DialogComponent(dialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickOut when user clicks out of dialog', () => {
    const clickOutSpy = jest.spyOn(component.clickOut, 'emit');

    const event = {
      target: { tagName: '', classList: { contains: (x: any) => false }, closest: () => null },
    };

    component.onClick(event as unknown as MouseEvent);

    expect(clickOutSpy).toHaveBeenCalled();
  });

  it('should not emit clickOut when user clicks out on button', () => {
    const clickOutSpy = jest.spyOn(component.clickOut, 'emit');

    const event = {
      target: { tagName: 'BUTTON', classList: { contains: (x: any) => false }, closest: () => null },
    };

    component.onClick(event as unknown as MouseEvent);

    expect(clickOutSpy).not.toHaveBeenCalled();
  });

  it('should not emit clickOut when user context menu item', () => {
    const clickOutSpy = jest.spyOn(component.clickOut, 'emit');

    const event = {
      target: { tagName: '', classList: { contains: (x: any) => true }, closest: () => null },
    };

    component.onClick(event as unknown as MouseEvent);

    expect(clickOutSpy).not.toHaveBeenCalled();
  });

  it('should not emit clickOut when user context click over dialog', () => {
    const clickOutSpy = jest.spyOn(component.clickOut, 'emit');

    const event = {
      target: { tagName: '', classList: { contains: (x: any) => false }, closest: () => true },
    };

    component.onClick(event as unknown as MouseEvent);

    expect(clickOutSpy).not.toHaveBeenCalled();
  });
});
