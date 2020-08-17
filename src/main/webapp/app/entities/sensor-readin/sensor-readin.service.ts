import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISensorReadin } from 'app/shared/model/sensor-readin.model';

type EntityResponseType = HttpResponse<ISensorReadin>;
type EntityArrayResponseType = HttpResponse<ISensorReadin[]>;

@Injectable({ providedIn: 'root' })
export class SensorReadinService {
  public resourceUrl = SERVER_API_URL + 'api/sensor-readins';

  constructor(protected http: HttpClient) {}

  create(sensorReadin: ISensorReadin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sensorReadin);
    return this.http
      .post<ISensorReadin>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sensorReadin: ISensorReadin): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sensorReadin);
    return this.http
      .put<ISensorReadin>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISensorReadin>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISensorReadin[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sensorReadin: ISensorReadin): ISensorReadin {
    const copy: ISensorReadin = Object.assign({}, sensorReadin, {
      time: sensorReadin.time && sensorReadin.time.isValid() ? sensorReadin.time.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time ? moment(res.body.time) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sensorReadin: ISensorReadin) => {
        sensorReadin.time = sensorReadin.time ? moment(sensorReadin.time) : undefined;
      });
    }
    return res;
  }
}
