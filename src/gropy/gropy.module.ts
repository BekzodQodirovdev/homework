import { Module } from '@nestjs/common';
import { GropyService } from './gropy.service';
import { GropyController } from './gropy.controller';
import { gropyProviders } from './gropy.providers';
import { GropyRepository } from './repositories/gropy.repositories';

@Module({
  controllers: [GropyController],
  providers: [GropyService, ...gropyProviders, GropyRepository],
})
export class GropyModule {}
