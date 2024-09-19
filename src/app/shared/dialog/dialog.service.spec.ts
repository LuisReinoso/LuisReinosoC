import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with isVisible as false', done => {
    service.isVisible$.subscribe(isVisible => {
      expect(isVisible).toBe(false);
      done();
    });
  });

  it('should set isVisible to true when open is called', done => {
    service.open();
    service.isVisible$.subscribe(isVisible => {
      expect(isVisible).toBe(true);
      done();
    });
  });

  it('should set isVisible to false when close is called', done => {
    service.open();
    service.close();
    service.isVisible$.subscribe(isVisible => {
      expect(isVisible).toBe(false);
      done();
    });
  });
});
