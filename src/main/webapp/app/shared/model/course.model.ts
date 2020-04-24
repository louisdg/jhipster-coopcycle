import { Moment } from 'moment';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IBasket } from 'app/shared/model/basket.model';
import { CourseState } from 'app/shared/model/enumerations/course-state.model';

export interface ICourse {
  id?: number;
  state?: CourseState;
  deliveryTime?: Moment;
  restaurant?: IRestaurant;
  basket?: IBasket;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public state?: CourseState,
    public deliveryTime?: Moment,
    public restaurant?: IRestaurant,
    public basket?: IBasket
  ) {}
}
