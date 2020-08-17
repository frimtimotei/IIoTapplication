import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IIoTapplicationTestModule } from '../../../test.module';
import { SensorReadinDetailComponent } from 'app/entities/sensor-readin/sensor-readin-detail.component';
import { SensorReadin } from 'app/shared/model/sensor-readin.model';

describe('Component Tests', () => {
  describe('SensorReadin Management Detail Component', () => {
    let comp: SensorReadinDetailComponent;
    let fixture: ComponentFixture<SensorReadinDetailComponent>;
    const route = ({ data: of({ sensorReadin: new SensorReadin(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [SensorReadinDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SensorReadinDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SensorReadinDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sensorReadin on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sensorReadin).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
