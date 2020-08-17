import { IEquipment } from 'app/shared/model/equipment.model';

export interface IActuator {
  id?: number;
  type?: string;
  controlValue?: number;
  equipment?: IEquipment;
}

export class Actuator implements IActuator {
  constructor(public id?: number, public type?: string, public controlValue?: number, public equipment?: IEquipment) {}
}
