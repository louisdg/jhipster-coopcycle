import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from './payment.service';
import { PaymentDeleteDialogComponent } from './payment-delete-dialog.component';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments?: IPayment[];
  eventSubscriber?: Subscription;

  constructor(protected paymentService: PaymentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.paymentService.query().subscribe((res: HttpResponse<IPayment[]>) => (this.payments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPayments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPayment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPayments(): void {
    this.eventSubscriber = this.eventManager.subscribe('paymentListModification', () => this.loadAll());
  }

  delete(payment: IPayment): void {
    const modalRef = this.modalService.open(PaymentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.payment = payment;
  }
}
