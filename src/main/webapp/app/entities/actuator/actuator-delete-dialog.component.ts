import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActuator } from 'app/shared/model/actuator.model';
import { ActuatorService } from './actuator.service';

@Component({
  templateUrl: './actuator-delete-dialog.component.html',
})
export class ActuatorDeleteDialogComponent {
  actuator?: IActuator;

  constructor(protected actuatorService: ActuatorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.actuatorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('actuatorListModification');
      this.activeModal.close();
    });
  }
}
