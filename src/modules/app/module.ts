import { HttpModule, Module } from '@nestjs/common';

import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { AuthController } from './controllers/auth';
import { UserRepository } from './repositories/user';
import { CommonModule } from 'modules/common/module';
import { DeviceRepository } from './repositories/device';
import { DatabaseModule } from 'modules/database/module';
import { ProfileController } from './controllers/profile';
import { ProductModule } from 'modules/product/product.module';
import { OrderModule } from 'modules/order/order.module';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule, ProductModule, OrderModule],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, UserService, UserRepository, DeviceRepository]
})
export class AppModule {}
