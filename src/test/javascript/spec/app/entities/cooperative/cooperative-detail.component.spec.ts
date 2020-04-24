import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { CooperativeDetailComponent } from 'app/entities/cooperative/cooperative-detail.component';
import { Cooperative } from 'app/shared/model/cooperative.model';

describe('Component Tests', () => {
  describe('Cooperative Management Detail Component', () => {
    let comp: CooperativeDetailComponent;
    let fixture: ComponentFixture<CooperativeDetailComponent>;
    const route = ({ data: of({ cooperative: new Cooperative(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [CooperativeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CooperativeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CooperativeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cooperative on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cooperative).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
