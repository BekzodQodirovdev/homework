import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { courseProviders } from './course.providers';
import { CourseRepository } from './repositories/course.repositories';

@Module({
  controllers: [CourseController],
  providers: [CourseService, ...courseProviders, CourseRepository],
})
export class CourseModule {}
