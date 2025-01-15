import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  order: {
    id: string;
  };

  @IsNotEmpty()
  product: {
    id: string;
  };
}
