import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Alert, AlertType } from '@app/models/alert.model';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show alert', done => {
    const alert: Alert = {
      type: AlertType.info,
      message: 'Operation was successful!',
      isClosable: true,
      isClosed: true,
    };

    service.alertState$.subscribe(receivedAlert => {
      expect(receivedAlert).toEqual(alert);
      done();
    });

    service.showAlert(alert);
  });

  it('should clear alert', done => {
    const alert: Alert = { type: AlertType.error, message: 'An error occurred!', isClosable: true, isClosed: true };

    service.showAlert(alert);

    service.alertState$.subscribe(receivedAlert => {
      if (receivedAlert) {
        expect(receivedAlert).toEqual(alert);
      } else {
        expect(receivedAlert).toBeNull();
        done();
      }
    });

    service.closeAlert();
  });
});
