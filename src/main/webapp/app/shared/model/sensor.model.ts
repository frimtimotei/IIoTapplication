import { ISensorReadin } from 'app/shared/model/sensor-readin.model';
import { IEquipment } from 'app/shared/model/equipment.model';

export interface ISensor {
  id?: number;
  sensorName?: string;
  tipSensor?: string;
  description?: string;
  sensors?: ISensorReadin[];
  equipment?: IEquipment;
}

export class Sensor implements ISensor {
  constructor(
    public id?: number,
    public sensorName?: string,
    public tipSensor?: string,
    public description?: string,
    public sensors?: ISensorReadin[],
    public equipment?: IEquipment
  ) {}
}
