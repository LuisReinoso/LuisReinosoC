import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ContextMenuService } from './context-menu.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent {
  position$ = this.contextMenuService.position$;
  isOpen$ = this.contextMenuService.isOpen$;

  constructor(public contextMenuService: ContextMenuService) {}

  closeMenu(): void {
    this.contextMenuService.close();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const isButton = target.tagName === 'BUTTON';
    const isMenu = target.closest('.context-menu') !== null;

    if (!isButton && !isMenu) {
      this.contextMenuService.close();
    }
  }
}
