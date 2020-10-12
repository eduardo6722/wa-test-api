import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderValidator {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public productsIds: number[];
}
