import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { CooperativeUpdateComponent } from 'app/entities/cooperative/cooperative-update.component';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';
import { Cooperative } from 'app/shared/model/cooperative.model';

describe('Component Tests', () => {
  describe('Cooperative Management Update Component', () => {
    let comp: CooperativeUpdateComponent;
    let fixture: ComponentFixture<CooperativeUpdateComponent>;
    let service: CooperativeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CooperativeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CooperativeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CooperativeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CooperativeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cooperative(123);
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
        const entity = new Cooperative();
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
