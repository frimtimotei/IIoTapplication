import { ISensor } from 'app/shared/model/sensor.model';
import { IActuator } from 'app/shared/model/actuator.model';

export interface IEquipment {
  id?: number;
  name?: string;
  desciption?: string;
  sensors?: ISensor[];
  actuators?: IActuator[];
}

export class Equipment implements IEquipment {
  constructor(
    public id?: number,
    public name?: string,
    public desciption?: string,
    public sensors?: ISensor[],
    public actuators?: IActuator[]
  ) {}
}
