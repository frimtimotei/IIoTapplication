import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { SensorDeleteDialogComponent } from './sensor-delete-dialog.component';

@Component({
  selector: 'jhi-sensor',
  templateUrl: './sensor.component.html',
})
export class SensorComponent implements OnInit, OnDestroy {
  sensors?: ISensor[];
  eventSubscriber?: Subscription;

  constructor(protected sensorService: SensorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.sensorService.query().subscribe((res: HttpResponse<ISensor[]>) => (this.sensors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSensors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISensor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSensors(): void {
    this.eventSubscriber = this.eventManager.subscribe('sensorListModification', () => this.loadAll());
  }

  delete(sensor: ISensor): void {
    const modalRef = this.modalService.open(SensorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sensor = sensor;
  }
}
