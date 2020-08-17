import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IIoTapplicationTestModule } from '../../../test.module';
import { ActuatorDetailComponent } from 'app/entities/actuator/actuator-detail.component';
import { Actuator } from 'app/shared/model/actuator.model';

describe('Component Tests', () => {
  describe('Actuator Management Detail Component', () => {
    let comp: ActuatorDetailComponent;
    let fixture: ComponentFixture<ActuatorDetailComponent>;
    const route = ({ data: of({ actuator: new Actuator(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [ActuatorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ActuatorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActuatorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load actuator on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.actuator).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
