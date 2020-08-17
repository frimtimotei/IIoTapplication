import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IIoTapplicationTestModule } from '../../../test.module';
import { SensorDetailComponent } from 'app/entities/sensor/sensor-detail.component';
import { Sensor } from 'app/shared/model/sensor.model';

describe('Component Tests', () => {
  describe('Sensor Management Detail Component', () => {
    let comp: SensorDetailComponent;
    let fixture: ComponentFixture<SensorDetailComponent>;
    const route = ({ data: of({ sensor: new Sensor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [SensorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SensorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SensorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sensor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sensor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
