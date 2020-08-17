import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISensorReadin, SensorReadin } from 'app/shared/model/sensor-readin.model';
import { SensorReadinService } from './sensor-readin.service';
import { SensorReadinComponent } from './sensor-readin.component';
import { SensorReadinDetailComponent } from './sensor-readin-detail.component';
import { SensorReadinUpdateComponent } from './sensor-readin-update.component';

@Injectable({ providedIn: 'root' })
export class SensorReadinResolve implements Resolve<ISensorReadin> {
  constructor(private service: SensorReadinService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISensorReadin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sensorReadin: HttpResponse<SensorReadin>) => {
          if (sensorReadin.body) {
            return of(sensorReadin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SensorReadin());
  }
}

export const sensorReadinRoute: Routes = [
  {
    path: '',
    component: SensorReadinComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iIoTapplicationApp.sensorReadin.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SensorReadinDetailComponent,
    resolve: {
      sensorReadin: SensorReadinResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iIoTapplicationApp.sensorReadin.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SensorReadinUpdateComponent,
    resolve: {
      sensorReadin: SensorReadinResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iIoTapplicationApp.sensorReadin.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SensorReadinUpdateComponent,
    resolve: {
      sensorReadin: SensorReadinResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'iIoTapplicationApp.sensorReadin.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
