import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { BasketComponent } from './basket.component';
import { BasketDetailComponent } from './basket-detail.component';
import { BasketUpdateComponent } from './basket-update.component';

@Injectable({ providedIn: 'root' })
export class BasketResolve implements Resolve<IBasket> {
  constructor(private service: BasketService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBasket> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((basket: HttpResponse<Basket>) => {
          if (basket.body) {
            return of(basket.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Basket());
  }
}

export const basketRoute: Routes = [
  {
    path: '',
    component: BasketComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.basket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BasketDetailComponent,
    resolve: {
      basket: BasketResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.basket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BasketUpdateComponent,
    resolve: {
      basket: BasketResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.basket.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BasketUpdateComponent,
    resolve: {
      basket: BasketResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.basket.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
