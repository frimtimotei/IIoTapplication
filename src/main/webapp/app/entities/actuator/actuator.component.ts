import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IActuator } from 'app/shared/model/actuator.model';
import { ActuatorService } from './actuator.service';
import { ActuatorDeleteDialogComponent } from './actuator-delete-dialog.component';

@Component({
  selector: 'jhi-actuator',
  templateUrl: './actuator.component.html',
})
export class ActuatorComponent implements OnInit, OnDestroy {
  actuators?: IActuator[];
  eventSubscriber?: Subscription;

  constructor(protected actuatorService: ActuatorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.actuatorService.query().subscribe((res: HttpResponse<IActuator[]>) => (this.actuators = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActuators();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IActuator): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActuators(): void {
    this.eventSubscriber = this.eventManager.subscribe('actuatorListModification', () => this.loadAll());
  }

  delete(actuator: IActuator): void {
    const modalRef = this.modalService.open(ActuatorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.actuator = actuator;
  }
}
