import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBasket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';

@Component({
  templateUrl: './basket-delete-dialog.component.html'
})
export class BasketDeleteDialogComponent {
  basket?: IBasket;

  constructor(protected basketService: BasketService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.basketService.delete(id).subscribe(() => {
      this.eventManager.broadcast('basketListModification');
      this.activeModal.close();
    });
  }
}
