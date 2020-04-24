import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICooperative } from 'app/shared/model/cooperative.model';

type EntityResponseType = HttpResponse<ICooperative>;
type EntityArrayResponseType = HttpResponse<ICooperative[]>;

@Injectable({ providedIn: 'root' })
export class CooperativeService {
  public resourceUrl = SERVER_API_URL + 'api/cooperatives';

  constructor(protected http: HttpClient) {}

  create(cooperative: ICooperative): Observable<EntityResponseType> {
    return this.http.post<ICooperative>(this.resourceUrl, cooperative, { observe: 'response' });
  }

  update(cooperative: ICooperative): Observable<EntityResponseType> {
    return this.http.put<ICooperative>(this.resourceUrl, cooperative, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICooperative>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICooperative[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
