import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertType } from '@app/models/alert.model';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() type: AlertType = AlertType.info;
  @Input() message: string = '';
  @Input() closable: boolean = true;
  @Input() isVisible: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter();

  alertType = AlertType;

  emitClose() {
    this.close.emit();
  }
}
