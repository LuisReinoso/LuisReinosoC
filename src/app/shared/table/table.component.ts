import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatTableValuePipe } from './format-table-value.pipe';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, FormatTableValuePipe, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columnTitles: string[] = [];
  @Input() columnNames: string[] = [];
  @Input() columnInfo: string[] = [];
  @Input() data: any[] = [];
  @Output() openMenu: EventEmitter<{dataId: string, x: number, y: number}> = new EventEmitter();

  emitOpenMenu(mouseEvent: MouseEvent, dataId: string) {
    this.openMenu.emit({dataId, x: mouseEvent.x, y: mouseEvent.y});
  }
}
