import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActuator } from 'app/shared/model/actuator.model';

@Component({
  selector: 'jhi-actuator-detail',
  templateUrl: './actuator-detail.component.html',
})
export class ActuatorDetailComponent implements OnInit {
  actuator: IActuator | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actuator }) => (this.actuator = actuator));
  }

  previousState(): void {
    window.history.back();
  }
}
