import { IUser } from 'app/core/user/user.model';
import { ICourse } from 'app/shared/model/course.model';
import { BasketState } from 'app/shared/model/enumerations/basket-state.model';

export interface IBasket {
  id?: number;
  basketId?: number;
  basketState?: BasketState;
  user?: IUser;
  course?: ICourse;
  customer?: IUser;
}

export class Basket implements IBasket {
  constructor(
    public id?: number,
    public basketId?: number,
    public basketState?: BasketState,
    public user?: IUser,
    public course?: ICourse,
    public customer?: IUser
  ) {}
}
