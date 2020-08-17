import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISensorReadin } from 'app/shared/model/sensor-readin.model';
import { SensorReadinService } from './sensor-readin.service';
import { SensorReadinDeleteDialogComponent } from './sensor-readin-delete-dialog.component';

@Component({
  selector: 'jhi-sensor-readin',
  templateUrl: './sensor-readin.component.html',
})
export class SensorReadinComponent implements OnInit, OnDestroy {
  sensorReadins?: ISensorReadin[];
  eventSubscriber?: Subscription;

  constructor(
    protected sensorReadinService: SensorReadinService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.sensorReadinService.query().subscribe((res: HttpResponse<ISensorReadin[]>) => (this.sensorReadins = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSensorReadins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISensorReadin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSensorReadins(): void {
    this.eventSubscriber = this.eventManager.subscribe('sensorReadinListModification', () => this.loadAll());
  }

  delete(sensorReadin: ISensorReadin): void {
    const modalRef = this.modalService.open(SensorReadinDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sensorReadin = sensorReadin;
  }
}
