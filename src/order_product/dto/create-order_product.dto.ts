import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  // @IsUUID()
  order: {
    id: string;
  };

  @IsNotEmpty()
  // @IsUUID()
  productId: {
    id: string;
  };
}
