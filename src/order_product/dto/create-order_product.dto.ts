import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  order_id: string;

  @IsNotEmpty()
  @IsUUID()
  product_id: string;
}
