import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IIoTapplicationTestModule } from '../../../test.module';
import { ActuatorUpdateComponent } from 'app/entities/actuator/actuator-update.component';
import { ActuatorService } from 'app/entities/actuator/actuator.service';
import { Actuator } from 'app/shared/model/actuator.model';

describe('Component Tests', () => {
  describe('Actuator Management Update Component', () => {
    let comp: ActuatorUpdateComponent;
    let fixture: ComponentFixture<ActuatorUpdateComponent>;
    let service: ActuatorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [ActuatorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ActuatorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActuatorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActuatorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Actuator(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Actuator();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
