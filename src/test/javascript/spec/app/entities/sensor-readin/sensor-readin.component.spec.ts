import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IIoTapplicationTestModule } from '../../../test.module';
import { SensorReadinComponent } from 'app/entities/sensor-readin/sensor-readin.component';
import { SensorReadinService } from 'app/entities/sensor-readin/sensor-readin.service';
import { SensorReadin } from 'app/shared/model/sensor-readin.model';

describe('Component Tests', () => {
  describe('SensorReadin Management Component', () => {
    let comp: SensorReadinComponent;
    let fixture: ComponentFixture<SensorReadinComponent>;
    let service: SensorReadinService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [SensorReadinComponent],
      })
        .overrideTemplate(SensorReadinComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensorReadinComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorReadinService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SensorReadin(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sensorReadins && comp.sensorReadins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
