import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { SearchComponent } from '../../shared/search/search.component';
import { ListProductPageService } from './list-product-page.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SelectComponent } from '../../shared/select/select.component';
import { ContextMenuComponent } from '../../shared/context-menu/context-menu.component';

@Component({
  standalone: true,
  imports: [
    TableComponent,
    ButtonComponent,
    SearchComponent,
    AsyncPipe,
    RouterLink,
    SelectComponent,
    ContextMenuComponent,
  ],
  templateUrl: './list-product-page.component.html',
  styleUrl: './list-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListProductPageComponent {
  columnTitles = ['Logo', 'Nombre', 'Descripción', 'Fecha de liberación', 'Fecha de reestructuración'];
  columnNames = ['id', 'logo', 'name', 'description', 'date_release', 'date_revision'];
  columnInfo = ['', '', '', 'Descripción del producto', 'Fecha inicial', 'Fecha final'];
  products$ = this.listProductPageService.products$;
  resultMessage$ = this.listProductPageService.resultMessage$;
  selectedProductId$ = this.listProductPageService.selectedProductId$;
  selectOptions = [5, 10, 20];

  constructor(private listProductPageService: ListProductPageService) {}

  search(searchValue: string): void {
    this.listProductPageService.search(searchValue);
  }

  updateDisplayedItems(displayedItems: number): void {
    this.listProductPageService.updateDisplayedItems(displayedItems);
  }

  openMenu(event: { dataId: string; x: number; y: number }): void {
    this.listProductPageService.openMenu(event);
  }

  clearProductId(): void {
    this.listProductPageService.clearProductId();
  }
}
