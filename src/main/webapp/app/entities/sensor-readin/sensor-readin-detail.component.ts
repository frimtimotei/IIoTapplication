import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISensorReadin } from 'app/shared/model/sensor-readin.model';

@Component({
  selector: 'jhi-sensor-readin-detail',
  templateUrl: './sensor-readin-detail.component.html',
})
export class SensorReadinDetailComponent implements OnInit {
  sensorReadin: ISensorReadin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sensorReadin }) => (this.sensorReadin = sensorReadin));
  }

  previousState(): void {
    window.history.back();
  }
}
