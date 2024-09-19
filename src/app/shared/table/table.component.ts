import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormatTableValuePipe } from './format-table-value.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, FormatTableValuePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columnTitles: string[] = [];
  @Input() columnNames: string[] = [];
  @Input() columnInfo: string[] = [];
  @Input() data: any[] = [];
}
