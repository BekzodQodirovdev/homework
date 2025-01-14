import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(3, { message: 'Price must be at least 3' })
  price: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Info must be at least 3 characters long' })
  @MaxLength(49, { message: 'Info must not exceed 49 characters' })
  info: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  @Max(99999, { message: 'Quantity must not exceed 99999' })
  quantity: number;
}
