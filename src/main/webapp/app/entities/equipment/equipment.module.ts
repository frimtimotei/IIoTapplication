import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IIoTapplicationSharedModule } from 'app/shared/shared.module';
import { EquipmentComponent } from './equipment.component';
import { EquipmentDetailComponent } from './equipment-detail.component';
import { EquipmentUpdateComponent } from './equipment-update.component';
import { EquipmentDeleteDialogComponent } from './equipment-delete-dialog.component';
import { equipmentRoute } from './equipment.route';

@NgModule({
  imports: [IIoTapplicationSharedModule, RouterModule.forChild(equipmentRoute)],
  declarations: [EquipmentComponent, EquipmentDetailComponent, EquipmentUpdateComponent, EquipmentDeleteDialogComponent],
  entryComponents: [EquipmentDeleteDialogComponent],
})
export class IIoTapplicationEquipmentModule {}
