import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISensor, Sensor } from 'app/shared/model/sensor.model';
import { SensorService } from './sensor.service';
import { IEquipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from 'app/entities/equipment/equipment.service';

@Component({
  selector: 'jhi-sensor-update',
  templateUrl: './sensor-update.component.html',
})
export class SensorUpdateComponent implements OnInit {
  isSaving = false;
  equipment: IEquipment[] = [];

  editForm = this.fb.group({
    id: [],
    sensorName: [],
    tipSensor: [],
    description: [],
    equipment: [],
  });

  constructor(
    protected sensorService: SensorService,
    protected equipmentService: EquipmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sensor }) => {
      this.updateForm(sensor);

      this.equipmentService.query().subscribe((res: HttpResponse<IEquipment[]>) => (this.equipment = res.body || []));
    });
  }

  updateForm(sensor: ISensor): void {
    this.editForm.patchValue({
      id: sensor.id,
      sensorName: sensor.sensorName,
      tipSensor: sensor.tipSensor,
      description: sensor.description,
      equipment: sensor.equipment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sensor = this.createFromForm();
    if (sensor.id !== undefined) {
      this.subscribeToSaveResponse(this.sensorService.update(sensor));
    } else {
      this.subscribeToSaveResponse(this.sensorService.create(sensor));
    }
  }

  private createFromForm(): ISensor {
    return {
      ...new Sensor(),
      id: this.editForm.get(['id'])!.value,
      sensorName: this.editForm.get(['sensorName'])!.value,
      tipSensor: this.editForm.get(['tipSensor'])!.value,
      description: this.editForm.get(['description'])!.value,
      equipment: this.editForm.get(['equipment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISensor>>): void {
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

  trackById(index: number, item: IEquipment): any {
    return item.id;
  }
}
