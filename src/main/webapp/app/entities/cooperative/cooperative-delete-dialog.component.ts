import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from './cooperative.service';

@Component({
  templateUrl: './cooperative-delete-dialog.component.html'
})
export class CooperativeDeleteDialogComponent {
  cooperative?: ICooperative;

  constructor(
    protected cooperativeService: CooperativeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cooperativeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cooperativeListModification');
      this.activeModal.close();
    });
  }
}
