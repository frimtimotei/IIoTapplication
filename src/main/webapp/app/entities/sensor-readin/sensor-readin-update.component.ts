import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISensorReadin, SensorReadin } from 'app/shared/model/sensor-readin.model';
import { SensorReadinService } from './sensor-readin.service';
import { ISensor } from 'app/shared/model/sensor.model';
import { SensorService } from 'app/entities/sensor/sensor.service';

@Component({
  selector: 'jhi-sensor-readin-update',
  templateUrl: './sensor-readin-update.component.html',
})
export class SensorReadinUpdateComponent implements OnInit {
  isSaving = false;
  sensors: ISensor[] = [];

  editForm = this.fb.group({
    id: [],
    value: [],
    time: [],
    sensor: [],
  });

  constructor(
    protected sensorReadinService: SensorReadinService,
    protected sensorService: SensorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sensorReadin }) => {
      if (!sensorReadin.id) {
        const today = moment().startOf('day');
        sensorReadin.time = today;
      }

      this.updateForm(sensorReadin);

      this.sensorService.query().subscribe((res: HttpResponse<ISensor[]>) => (this.sensors = res.body || []));
    });
  }

  updateForm(sensorReadin: ISensorReadin): void {
    this.editForm.patchValue({
      id: sensorReadin.id,
      value: sensorReadin.value,
      time: sensorReadin.time ? sensorReadin.time.format(DATE_TIME_FORMAT) : null,
      sensor: sensorReadin.sensor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sensorReadin = this.createFromForm();
    if (sensorReadin.id !== undefined) {
      this.subscribeToSaveResponse(this.sensorReadinService.update(sensorReadin));
    } else {
      this.subscribeToSaveResponse(this.sensorReadinService.create(sensorReadin));
    }
  }

  private createFromForm(): ISensorReadin {
    return {
      ...new SensorReadin(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
      time: this.editForm.get(['time'])!.value ? moment(this.editForm.get(['time'])!.value, DATE_TIME_FORMAT) : undefined,
      sensor: this.editForm.get(['sensor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISensorReadin>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISensor): any {
    return item.id;
  }
}
