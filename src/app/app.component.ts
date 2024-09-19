import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert/alert.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  alertState$ = this.alertService.alertState$;

  constructor(private alertService: AlertService) {}

  closeAlert() {
    this.alertService.closeAlert();
  }
}
