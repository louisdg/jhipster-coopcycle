import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

type SelectableEntity = IUser | ICourse;

@Component({
  selector: 'jhi-basket-update',
  templateUrl: './basket-update.component.html'
})
export class BasketUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  courses: ICourse[] = [];

  editForm = this.fb.group({
    id: [],
    basketId: [null, [Validators.required]],
    basketState: [null, [Validators.required]],
    user: [],
    course: [],
    customer: []
  });

  constructor(
    protected basketService: BasketService,
    protected userService: UserService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basket }) => {
      this.updateForm(basket);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.courseService
        .query({ filter: 'basket-is-null' })
        .pipe(
          map((res: HttpResponse<ICourse[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICourse[]) => {
          if (!basket.course || !basket.course.id) {
            this.courses = resBody;
          } else {
            this.courseService
              .find(basket.course.id)
              .pipe(
                map((subRes: HttpResponse<ICourse>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICourse[]) => (this.courses = concatRes));
          }
        });
    });
  }

  updateForm(basket: IBasket): void {
    this.editForm.patchValue({
      id: basket.id,
      basketId: basket.basketId,
      basketState: basket.basketState,
      user: basket.user,
      course: basket.course,
      customer: basket.customer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basket = this.createFromForm();
    if (basket.id !== undefined) {
      this.subscribeToSaveResponse(this.basketService.update(basket));
    } else {
      this.subscribeToSaveResponse(this.basketService.create(basket));
    }
  }

  private createFromForm(): IBasket {
    return {
      ...new Basket(),
      id: this.editForm.get(['id'])!.value,
      basketId: this.editForm.get(['basketId'])!.value,
      basketState: this.editForm.get(['basketState'])!.value,
      user: this.editForm.get(['user'])!.value,
      course: this.editForm.get(['course'])!.value,
      customer: this.editForm.get(['customer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasket>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
