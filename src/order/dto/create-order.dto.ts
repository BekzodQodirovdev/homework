import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { OrderEnum } from 'src/enum/order.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  user: {
    id: string;
  };

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Total price must be a valid number with up to 2 decimal places',
    },
  )
  total_price: number;

  @IsNotEmpty()
  @IsEnum(OrderEnum, { message: 'Status must be a valid enum value' })
  status: OrderEnum;
}
