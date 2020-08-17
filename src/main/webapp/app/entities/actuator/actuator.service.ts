import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IActuator } from 'app/shared/model/actuator.model';

type EntityResponseType = HttpResponse<IActuator>;
type EntityArrayResponseType = HttpResponse<IActuator[]>;

@Injectable({ providedIn: 'root' })
export class ActuatorService {
  public resourceUrl = SERVER_API_URL + 'api/actuators';

  constructor(protected http: HttpClient) {}

  create(actuator: IActuator): Observable<EntityResponseType> {
    return this.http.post<IActuator>(this.resourceUrl, actuator, { observe: 'response' });
  }

  update(actuator: IActuator): Observable<EntityResponseType> {
    return this.http.put<IActuator>(this.resourceUrl, actuator, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IActuator>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IActuator[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
