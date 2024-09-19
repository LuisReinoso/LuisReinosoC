import { Injectable } from '@angular/core';
import { ListProductService } from '@app/core/services/list-product.service';
import { ContextMenuService } from '@app/shared/context-menu/context-menu.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListProductPageService {
  products$ = this.listProductService.products$;
  resultMessage$ = this.listProductService.resultMessage$;

  private selectedProductId: BehaviorSubject<string> = new BehaviorSubject('');
  selectedProductId$ = this.selectedProductId.asObservable();

  constructor(private listProductService: ListProductService, private contextMenuService: ContextMenuService) {}

  updateDisplayedItems(displayedItems: number) {
    this.listProductService.updateDisplayedItems(displayedItems);
  }

  search(searchValue: string) {
    this.listProductService.search(searchValue);
  }

  openMenu(event: { dataId: string; x: number; y: number }) {
    this.selectedProductId.next(event.dataId);
    this.contextMenuService.setPosition(event.x, event.y);
    this.contextMenuService.open();
  }

  clearProductId() {
    this.selectedProductId.next('');
  }
}
