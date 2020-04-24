import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBasket } from 'app/shared/model/basket.model';

@Component({
  selector: 'jhi-basket-detail',
  templateUrl: './basket-detail.component.html'
})
export class BasketDetailComponent implements OnInit {
  basket: IBasket | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basket }) => (this.basket = basket));
  }

  previousState(): void {
    window.history.back();
  }
}
