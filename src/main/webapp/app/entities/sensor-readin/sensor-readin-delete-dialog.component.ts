import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensorReadin } from 'app/shared/model/sensor-readin.model';
import { SensorReadinService } from './sensor-readin.service';

@Component({
  templateUrl: './sensor-readin-delete-dialog.component.html',
})
export class SensorReadinDeleteDialogComponent {
  sensorReadin?: ISensorReadin;

  constructor(
    protected sensorReadinService: SensorReadinService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sensorReadinService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sensorReadinListModification');
      this.activeModal.close();
    });
  }
}
