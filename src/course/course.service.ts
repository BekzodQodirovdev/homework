import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseRepository } from './repositories/course.repositories';

@Injectable()
export class CourseService {
  constructor(private courseRepo: CourseRepository) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepo.create(createCourseDto);
  }

  findAll() {
    return this.courseRepo.findAll();
  }

  findOne(id: number) {
    return this.courseRepo.findOne(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepo.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepo.remove(id);
  }
}
