import { PartialType } from '@nestjs/swagger';
import { SignUpAuthDto } from './sign-up.dto';

export class UpdateAuthDto extends PartialType(SignUpAuthDto) {}
