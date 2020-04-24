import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IRestaurant {
  id?: number;
  restaurantId?: number;
  name?: string;
  description?: string;
  cooperatives?: ICooperative[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public restaurantId?: number,
    public name?: string,
    public description?: string,
    public cooperatives?: ICooperative[]
  ) {}
}
