import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderRepository } from './repositories/order.repository';

@Module({
  providers: [OrderService, OrderRepository],
  controllers: [OrderController]
})
export class OrderModule {}
