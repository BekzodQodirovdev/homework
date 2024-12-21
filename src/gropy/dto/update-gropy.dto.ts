import { PartialType } from '@nestjs/swagger';
import { CreateGropyDto } from './create-gropy.dto';

export class UpdateGropyDto extends PartialType(CreateGropyDto) {}
