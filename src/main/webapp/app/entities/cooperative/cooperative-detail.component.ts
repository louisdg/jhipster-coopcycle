import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICooperative } from 'app/shared/model/cooperative.model';

@Component({
  selector: 'jhi-cooperative-detail',
  templateUrl: './cooperative-detail.component.html'
})
export class CooperativeDetailComponent implements OnInit {
  cooperative: ICooperative | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cooperative }) => (this.cooperative = cooperative));
  }

  previousState(): void {
    window.history.back();
  }
}
