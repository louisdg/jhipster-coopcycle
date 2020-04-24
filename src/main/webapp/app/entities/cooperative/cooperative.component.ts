import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from './cooperative.service';
import { CooperativeDeleteDialogComponent } from './cooperative-delete-dialog.component';

@Component({
  selector: 'jhi-cooperative',
  templateUrl: './cooperative.component.html'
})
export class CooperativeComponent implements OnInit, OnDestroy {
  cooperatives?: ICooperative[];
  eventSubscriber?: Subscription;

  constructor(
    protected cooperativeService: CooperativeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.cooperativeService.query().subscribe((res: HttpResponse<ICooperative[]>) => (this.cooperatives = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCooperatives();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICooperative): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCooperatives(): void {
    this.eventSubscriber = this.eventManager.subscribe('cooperativeListModification', () => this.loadAll());
  }

  delete(cooperative: ICooperative): void {
    const modalRef = this.modalService.open(CooperativeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cooperative = cooperative;
  }
}
