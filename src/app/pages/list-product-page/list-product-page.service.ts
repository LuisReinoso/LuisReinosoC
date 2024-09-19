import { Injectable } from '@angular/core';
import { ListProductService } from '@app/core/services/list-product.service';

@Injectable({
  providedIn: 'root',
})
export class ListProductPageService {
  products$ = this.listProductService.products$;
  resultMessage$ = this.listProductService.resultMessage$;

  constructor(private listProductService: ListProductService) {}

  updateDisplayedItems(displayedItems: number) {
    this.listProductService.updateDisplayedItems(displayedItems);
  }

  search(searchValue: string) {
    this.listProductService.search(searchValue);
  }
}
