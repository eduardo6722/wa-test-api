import { IOrderProduct } from './orderProduct';
import { IUser } from './user';

export interface IOrder {
  id?: number;
  amount: number;
  userId: number;
  createdDate?: Date;
  updatedDate?: Date;

  user: IUser;
  orderProducts: IOrderProduct[];
}
