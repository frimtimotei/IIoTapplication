import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IIoTapplicationTestModule } from '../../../test.module';
import { SensorReadinUpdateComponent } from 'app/entities/sensor-readin/sensor-readin-update.component';
import { SensorReadinService } from 'app/entities/sensor-readin/sensor-readin.service';
import { SensorReadin } from 'app/shared/model/sensor-readin.model';

describe('Component Tests', () => {
  describe('SensorReadin Management Update Component', () => {
    let comp: SensorReadinUpdateComponent;
    let fixture: ComponentFixture<SensorReadinUpdateComponent>;
    let service: SensorReadinService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IIoTapplicationTestModule],
        declarations: [SensorReadinUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SensorReadinUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensorReadinUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensorReadinService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SensorReadin(123);
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
        const entity = new SensorReadin();
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
