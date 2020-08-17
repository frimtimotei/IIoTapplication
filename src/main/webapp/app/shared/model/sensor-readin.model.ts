import { Moment } from 'moment';
import { ISensor } from 'app/shared/model/sensor.model';

export interface ISensorReadin {
  id?: number;
  value?: number;
  time?: Moment;
  sensor?: ISensor;
}

export class SensorReadin implements ISensorReadin {
  constructor(public id?: number, public value?: number, public time?: Moment, public sensor?: ISensor) {}
}
