import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { DialogService } from './dialog.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Output() clickOut = new EventEmitter<void>();

  isVisible$ = this.dialogService.isVisible$;

  constructor(private dialogService: DialogService) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isButton = target.tagName === 'BUTTON';
    const isContextMenuItem = target.classList.contains('context-menu__item');
    const isDialog = target.classList.contains('dialog') || target.closest('.dialog') !== null;

    if (!isDialog && !isButton && !isContextMenuItem) {
      this.clickOut.emit();
    }
  }
}
