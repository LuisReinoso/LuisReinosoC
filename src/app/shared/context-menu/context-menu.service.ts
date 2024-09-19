import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isOpen$ = this.isOpen.asObservable();

  private position: BehaviorSubject<{x: number, y: number}> = new BehaviorSubject({x: 0, y: 0});
  public position$ = this.position.asObservable();

  open(): void {
    this.isOpen.next(true);
  }

  close(): void {
    this.isOpen.next(false);
  }

  isMenuOpen(): boolean {
    return this.isOpen.value;
  }

  setPosition(x: number, y: number) {
    this.position.next({x, y});
  }
}
