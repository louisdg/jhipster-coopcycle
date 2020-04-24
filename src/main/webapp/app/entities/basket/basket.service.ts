import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBasket } from 'app/shared/model/basket.model';

type EntityResponseType = HttpResponse<IBasket>;
type EntityArrayResponseType = HttpResponse<IBasket[]>;

@Injectable({ providedIn: 'root' })
export class BasketService {
  public resourceUrl = SERVER_API_URL + 'api/baskets';

  constructor(protected http: HttpClient) {}

  create(basket: IBasket): Observable<EntityResponseType> {
    return this.http.post<IBasket>(this.resourceUrl, basket, { observe: 'response' });
  }

  update(basket: IBasket): Observable<EntityResponseType> {
    return this.http.put<IBasket>(this.resourceUrl, basket, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBasket>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBasket[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
