import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IIoTapplicationSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [IIoTapplicationSharedModule, RouterModule.forChild([HOME_ROUTE]), ChartModule, ToastModule],
  declarations: [HomeComponent],
})
export class IIoTapplicationHomeModule {}
