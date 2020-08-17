import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sensor',
        loadChildren: () => import('./sensor/sensor.module').then(m => m.IIoTapplicationSensorModule),
      },
      {
        path: 'actuator',
        loadChildren: () => import('./actuator/actuator.module').then(m => m.IIoTapplicationActuatorModule),
      },
      {
        path: 'equipment',
        loadChildren: () => import('./equipment/equipment.module').then(m => m.IIoTapplicationEquipmentModule),
      },
      {
        path: 'sensor-readin',
        loadChildren: () => import('./sensor-readin/sensor-readin.module').then(m => m.IIoTapplicationSensorReadinModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class IIoTapplicationEntityModule {}
