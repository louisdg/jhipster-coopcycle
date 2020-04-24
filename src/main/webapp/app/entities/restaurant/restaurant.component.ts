import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { RestaurantDeleteDialogComponent } from './restaurant-delete-dialog.component';

@Component({
  selector: 'jhi-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit, OnDestroy {
  restaurants?: IRestaurant[];
  eventSubscriber?: Subscription;

  constructor(protected restaurantService: RestaurantService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRestaurants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRestaurant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRestaurants(): void {
    this.eventSubscriber = this.eventManager.subscribe('restaurantListModification', () => this.loadAll());
  }

  delete(restaurant: IRestaurant): void {
    const modalRef = this.modalService.open(RestaurantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.restaurant = restaurant;
  }
}
