import { Injectable } from '@angular/core';
import { Alert } from '@app/models/alert.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertState = new BehaviorSubject<Alert | null>(null);
  alertState$ = this.alertState.asObservable();

  showAlert(alert: Alert) {
    this.alertState.next(alert);
  }

  closeAlert() {
    this.alertState.next(null);
  }
}
