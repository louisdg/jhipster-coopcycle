import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { BasketUpdateComponent } from 'app/entities/basket/basket-update.component';
import { BasketService } from 'app/entities/basket/basket.service';
import { Basket } from 'app/shared/model/basket.model';

describe('Component Tests', () => {
  describe('Basket Management Update Component', () => {
    let comp: BasketUpdateComponent;
    let fixture: ComponentFixture<BasketUpdateComponent>;
    let service: BasketService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [BasketUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BasketUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BasketUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BasketService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Basket(123);
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
        const entity = new Basket();
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
