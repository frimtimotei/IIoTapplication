import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IIoTapplicationSharedModule } from 'app/shared/shared.module';
import { SensorReadinComponent } from './sensor-readin.component';
import { SensorReadinDetailComponent } from './sensor-readin-detail.component';
import { SensorReadinUpdateComponent } from './sensor-readin-update.component';
import { SensorReadinDeleteDialogComponent } from './sensor-readin-delete-dialog.component';
import { sensorReadinRoute } from './sensor-readin.route';

@NgModule({
  imports: [IIoTapplicationSharedModule, RouterModule.forChild(sensorReadinRoute)],
  declarations: [SensorReadinComponent, SensorReadinDetailComponent, SensorReadinUpdateComponent, SensorReadinDeleteDialogComponent],
  entryComponents: [SensorReadinDeleteDialogComponent],
})
export class IIoTapplicationSensorReadinModule {}
