import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from 'decorators/user.decorator';
import { Order } from 'modules/database/models/order';
import { OrderService } from '../services/order.service';
import { AuthRequired } from 'modules/common/guards/token';
import { CreateOrderValidator } from '../validators/order';
import { User as UserModel } from 'modules/database/models/user';
import { IResponseMessage } from 'modules/database/interfaces/responseMessage';

@ApiTags('Order')
@Controller('order')
@AuthRequired()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  public insert(@User() user: UserModel, @Body() model: CreateOrderValidator): Promise<IResponseMessage> {
    return this.orderService.insert(user, model.productsIds);
  }

  @Get()
  public async get(@User() user: UserModel): Promise<Order[]> {
    return this.orderService.get(user.id);
  }
}
