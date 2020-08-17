import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IActuator, Actuator } from 'app/shared/model/actuator.model';
import { ActuatorService } from './actuator.service';
import { IEquipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from 'app/entities/equipment/equipment.service';

@Component({
  selector: 'jhi-actuator-update',
  templateUrl: './actuator-update.component.html',
})
export class ActuatorUpdateComponent implements OnInit {
  isSaving = false;
  equipment: IEquipment[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    controlValue: [],
    equipment: [],
  });

  constructor(
    protected actuatorService: ActuatorService,
    protected equipmentService: EquipmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actuator }) => {
      this.updateForm(actuator);

      this.equipmentService.query().subscribe((res: HttpResponse<IEquipment[]>) => (this.equipment = res.body || []));
    });
  }

  updateForm(actuator: IActuator): void {
    this.editForm.patchValue({
      id: actuator.id,
      type: actuator.type,
      controlValue: actuator.controlValue,
      equipment: actuator.equipment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const actuator = this.createFromForm();
    if (actuator.id !== undefined) {
      this.subscribeToSaveResponse(this.actuatorService.update(actuator));
    } else {
      this.subscribeToSaveResponse(this.actuatorService.create(actuator));
    }
  }

  private createFromForm(): IActuator {
    return {
      ...new Actuator(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      controlValue: this.editForm.get(['controlValue'])!.value,
      equipment: this.editForm.get(['equipment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActuator>>): void {
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
