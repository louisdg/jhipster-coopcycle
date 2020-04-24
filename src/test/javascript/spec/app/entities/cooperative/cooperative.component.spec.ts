import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { CooperativeComponent } from 'app/entities/cooperative/cooperative.component';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';
import { Cooperative } from 'app/shared/model/cooperative.model';

describe('Component Tests', () => {
  describe('Cooperative Management Component', () => {
    let comp: CooperativeComponent;
    let fixture: ComponentFixture<CooperativeComponent>;
    let service: CooperativeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CooperativeComponent]
      })
        .overrideTemplate(CooperativeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CooperativeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CooperativeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cooperative(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cooperatives && comp.cooperatives[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
