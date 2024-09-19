import { TestBed } from '@angular/core/testing';
import { ContextMenuService } from './context-menu.service';

describe('ContextMenuService', () => {
  let service: ContextMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with the menu closed', () => {
    expect(service.isMenuOpen()).toBe(false);
  });

  it('should open the menu', () => {
    service.open();
    expect(service.isMenuOpen()).toBe(true);
  });

  it('should close the menu', () => {
    service.open();
    service.close();
    expect(service.isMenuOpen()).toBe(false);
  });

  it('should set position correctly', done => {
    service.setPosition(100, 200);
    service.position$.subscribe(position => {
      expect(position).toEqual({ x: 100, y: 200 });
      done();
    });
  });

  it('should update position correctly', done => {
    service.setPosition(50, 75);
    service.position$.subscribe(position => {
      expect(position).toEqual({ x: 50, y: 75 });
    });

    service.setPosition(150, 250);
    service.position$.subscribe(position => {
      expect(position).toEqual({ x: 150, y: 250 });
      done();
    });
  });
});
