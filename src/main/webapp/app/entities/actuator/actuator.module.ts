import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IIoTapplicationSharedModule } from 'app/shared/shared.module';
import { ActuatorComponent } from './actuator.component';
import { ActuatorDetailComponent } from './actuator-detail.component';
import { ActuatorUpdateComponent } from './actuator-update.component';
import { ActuatorDeleteDialogComponent } from './actuator-delete-dialog.component';
import { actuatorRoute } from './actuator.route';

@NgModule({
  imports: [IIoTapplicationSharedModule, RouterModule.forChild(actuatorRoute)],
  declarations: [ActuatorComponent, ActuatorDetailComponent, ActuatorUpdateComponent, ActuatorDeleteDialogComponent],
  entryComponents: [ActuatorDeleteDialogComponent],
})
export class IIoTapplicationActuatorModule {}
