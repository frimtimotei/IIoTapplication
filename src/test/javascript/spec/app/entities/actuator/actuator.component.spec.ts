import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IIoTapplicationTestModule } from '../../../test.module';
import { ActuatorComponent } from 'app/entities/actuator/actuator.component';
import { ActuatorService } from 'app/entities/actuator/actuator.service';
import { Actuator } from 'app/shared/model/actuator.model';

describe('Component Tests', () => {
  describe('Actuator Management Component', () => {
    let comp: ActuatorComponent;
    let fixture: ComponentFixture<ActuatorComponent>;
    let service: ActuatorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [ActuatorComponent],
      })
        .overrideTemplate(ActuatorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActuatorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActuatorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Actuator(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.actuators && comp.actuators[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
