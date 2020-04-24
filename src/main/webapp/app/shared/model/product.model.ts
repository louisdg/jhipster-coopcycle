import { IBasket } from 'app/shared/model/basket.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { Disponibility } from 'app/shared/model/enumerations/disponibility.model';

export interface IProduct {
  id?: number;
  price?: number;
  disponibility?: Disponibility;
  description?: string;
  basket?: IBasket;
  restaurant?: IRestaurant;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public price?: number,
    public disponibility?: Disponibility,
    public description?: string,
    public basket?: IBasket,
    public restaurant?: IRestaurant
  ) {}
}
