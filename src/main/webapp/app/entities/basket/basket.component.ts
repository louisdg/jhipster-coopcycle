import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBasket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { BasketDeleteDialogComponent } from './basket-delete-dialog.component';

@Component({
  selector: 'jhi-basket',
  templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit, OnDestroy {
  baskets?: IBasket[];
  eventSubscriber?: Subscription;

  constructor(protected basketService: BasketService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.basketService.query().subscribe((res: HttpResponse<IBasket[]>) => (this.baskets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBaskets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBasket): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBaskets(): void {
    this.eventSubscriber = this.eventManager.subscribe('basketListModification', () => this.loadAll());
  }

  delete(basket: IBasket): void {
    const modalRef = this.modalService.open(BasketDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.basket = basket;
  }
}
